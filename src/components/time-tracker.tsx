"use client"

import {useEffect, useState} from "react"
import {Clock, MapPin, Wifi} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {checkIn, checkOut, getCurrentOperationStatus} from "@/services/operation/operation.api"
import LoadingComponent from "@/components/loading"
import {CheckInOutBody} from "@/types/operation.interface"
import {toast} from "react-toastify"
import {convertMinutesToHourMinute} from "@/helpers/convertMinutesToHourMinute"

export interface LocationData {
    place_id: number
    licence: string
    osm_type: string
    osm_id: number
    lat: string
    lon: string
    class: string
    type: string
    place_rank: number
    importance: number
    addresstype: string
    name: string
    display_name: string
    address: {
        office: string
        house_number: string
        road: string
        city_district: string
        city: string
        "ISO3166-2-lvl4": string
        postcode: string
        country: string
        country_code: string
    }
    boundingbox: [string, string, string, string] // [min_lat, max_lat, min_lon, max_lon]
}

export function TimeTracker() {
    // Time states
    const [currentTime, setCurrentTime] = useState(new Date())
    const [workingHours, setWorkingHours] = useState("00:00:00")

    // Check-in/out states
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [isCompletedToday, setIsCompletedToday] = useState(false) // New state for completed session
    const [checkInTime, setCheckInTime] = useState<Date | null>(null)
    const [lateDiff, setLateDiff] = useState<number>(0)

    // UI states
    const [loading, setLoading] = useState(false)
    const [isActionLoading, setIsActionLoading] = useState(false)

    // Location states
    const [address, setAddress] = useState<string>("Đang lấy vị trí...")
    const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
        latitude: null,
        longitude: null,
    })

    // Reset all states to initial values
    const resetState = () => {
        setIsCheckedIn(false)
        setIsCompletedToday(false)
        setCheckInTime(null)
        setLateDiff(0)
        setWorkingHours("00:00:00")
    }
    useEffect(() => {
        console.log(location)
    }, [location]);
    // Calculate late time based on check-in time
    const calculateLateTime = (checkInDate: Date) => {
        const eightAM = new Date(checkInDate)
        eightAM.setHours(8, 0, 0, 0)

        if (checkInDate > eightAM) {
            const diffMs = checkInDate.getTime() - eightAM.getTime()
            const diffMins = Math.floor(diffMs / (1000 * 60))
            setLateDiff(diffMins)
        } else {
            setLateDiff(0)
        }
    }

    // Handle active work session (currently working)
    const handleActiveSession = (checkInTimeStr: string) => {
        const checkInDate = new Date(checkInTimeStr)

        setIsCheckedIn(true)
        setCheckInTime(checkInDate)
        calculateLateTime(checkInDate)
    }

    // Handle completed work session (checked in and out)
    const handleCompletedSession = (checkInTimeStr: string, checkOutTimeStr: string) => {
        const checkInDate = new Date(checkInTimeStr)
        const checkOutDate = new Date(checkOutTimeStr)

        setIsCheckedIn(false) // Not currently working
        setIsCompletedToday(true) // Completed work for today
        setCheckInTime(checkInDate)
        calculateLateTime(checkInDate)

        // Calculate total worked time for the day
        const totalWorkedMs = checkOutDate.getTime() - checkInDate.getTime()

        const hours = Math.floor(totalWorkedMs / (1000 * 60 * 60))
        const minutes = Math.floor((totalWorkedMs % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((totalWorkedMs % (1000 * 60)) / 1000)

        setWorkingHours(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        )
    }

    // Handle inactive work session (no check-in today)
    const handleInactiveSession = () => {
        resetState()
    }

    // Get current operation status from API
    const getCurrentStatus = async () => {
        try {
            setLoading(true)
            const res = await getCurrentOperationStatus()
            console.log("Current status:", res.data)

            // Reset state before processing
            resetState()

            // Process current status based on check-in/check-out combination
            if (res.data.isCheckIn && res.data.checkInTime) {
                if (res.data.isCheckOut && res.data.checkOutTime) {
                    // Already completed work for today (checked in and out)
                    handleCompletedSession(res.data.checkInTime, res.data.checkOutTime)
                } else {
                    // Currently in active work session (checked in but not out)
                    handleActiveSession(res.data.checkInTime)
                }
            } else {
                // No check-in today
                handleInactiveSession()
            }

        } catch (err) {
            console.error("Error getting current status:", err)
            // On error, ensure state is reset to safe defaults
            handleInactiveSession()
            toast.error("Không thể lấy trạng thái hiện tại. Vui lòng thử lại!")
        } finally {
            setLoading(false)
        }
    }

    // Get address from coordinates
    const getAddress = async () => {
        if (!location.latitude || !location.longitude) {
            setAddress("Không thể lấy vị trí")
            return
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'TimeTrackerApp/1.0',
                    },
                }
            )

            if (!res.ok) {
                throw new Error("Failed to fetch address")
            }

            const data: LocationData = await res.json()
            setAddress(data.display_name || "Không thể xác định địa chỉ")
        } catch (error) {
            console.error("Error getting address:", error)
            setAddress("Không thể lấy địa chỉ")
        }
    }

    // Get user location
    const getUserLocation = () => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported")
            setAddress("Trình duyệt không hỗ trợ định vị")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (error) => {
                console.error("Error getting location:", error)
                setAddress("Không thể lấy vị trí")
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        )
    }

    // Handle check-in action
    const handleCheckIn = async () => {
        try {
            setIsActionLoading(true)

            const checkInBody: CheckInOutBody = {
                latitude:/* location.latitude?.toString() ||*/ "10.870148438352643",
                longitude: /*location.longitude?.toString() ||*/ "106.80384078833825",
            }

            const res = await checkIn(checkInBody)

            if (res.status === 200 && res.data?.time) {
                const newCheckInTime = new Date(res.data.time)
                setIsCheckedIn(true)
                setCheckInTime(newCheckInTime)
                calculateLateTime(newCheckInTime)
                toast.success("Check-in thành công!")
            } else {
                throw new Error("Invalid response from server")
            }
        } catch (error) {
            console.error("Check-in error:", error)
            toast.error("Check-in thất bại. Vui lòng thử lại!")
        } finally {
            setIsActionLoading(false)
        }
    }

    // Handle check-out action
    const handleCheckOut = async () => {
        try {
            setIsActionLoading(true)

            const checkOutBody: CheckInOutBody = {
                latitude:/* location.latitude?.toString() ||*/ "10.870148438352643",
                longitude: /*location.longitude?.toString() ||*/ "106.80384078833825",
            }

            const res = await checkOut(checkOutBody)

            if (res.status === 200) {
                // After successful check-out, mark as completed for today
                setIsCheckedIn(false)
                setIsCompletedToday(true)
                // Keep the working hours displayed (don't reset to 00:00:00)
                toast.success("Check-out thành công!")
            } else {
                throw new Error("Invalid response from server")
            }
        } catch (error) {
            console.error("Check-out error:", error)
            toast.error("Check-out thất bại. Vui lòng thử lại!")
        } finally {
            setIsActionLoading(false)
        }
    }

    // Initialize component
    useEffect(() => {
        getUserLocation()
        getCurrentStatus()
    }, [])

    // Get address when location changes
    useEffect(() => {
        if (location.latitude && location.longitude) {
            getAddress()
        }
    }, [location.latitude, location.longitude])

    // Timer for current time and working hours
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())

            // Calculate working hours if checked in
            if (isCheckedIn && checkInTime) {
                const now = new Date().getTime()
                const startTime = checkInTime.getTime()
                const diff = now - startTime

                const hours = Math.floor(diff / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)

                setWorkingHours(
                    `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
                )
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [isCheckedIn, checkInTime])

    if (loading) {
        return <LoadingComponent/>
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5"/>
                    Chấm công
                </CardTitle>
                <CardDescription>Theo dõi thời gian làm việc của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Current Time Display */}
                <div className="text-center">
                    <div className="text-4xl font-mono font-bold text-gray-900">
                        {currentTime.toLocaleTimeString("vi-VN")}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {currentTime.toLocaleDateString("vi-VN")}
                    </div>
                </div>

                {/* Location and Connection Info */}
                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 flex-shrink-0"/>
                        <span className="text-center text-xs leading-relaxed">{address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Wifi className="h-4 w-4"/>
                        <span>Kết nối ổn định</span>
                    </div>
                </div>

                {/* Status and Working Hours */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <Badge
                            variant={isCheckedIn ? "default" : isCompletedToday ? "outline" : "secondary"}
                            className={`px-4 py-2 ${isCompletedToday ? "border-green-500 text-green-700 bg-green-50" : ""}`}
                        >
                            {isCheckedIn ? "Đang làm việc" : isCompletedToday ? "Đã chấm công ngày hôm nay" : "Chưa chấm công"}
                        </Badge>
                    </div>

                    {(isCheckedIn || isCompletedToday) && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                                {isCheckedIn ? "Thời gian làm việc hôm nay" : "Tổng thời gian làm việc hôm nay"}
                            </p>
                            <div
                                className={`text-2xl font-mono font-bold ${isCheckedIn ? "text-blue-600" : "text-green-600"}`}>
                                {workingHours}
                            </div>
                            <p className="text-xs text-gray-500">
                                Bắt đầu lúc: {checkInTime?.toLocaleTimeString("vi-VN")}
                            </p>
                            {lateDiff > 0 && (
                                <p className="text-xs text-red-500">
                                    Trễ: {convertMinutesToHourMinute(lateDiff)}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                        {isCompletedToday ? (
                            <div className="text-center">
                                <div className="text-sm text-green-600 font-medium">
                                    ✅ Đã hoàn thành công việc hôm nay
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                    Hẹn gặp lại bạn vào ngày mai!
                                </div>
                            </div>
                        ) : !isCheckedIn ? (
                            <Button
                                onClick={handleCheckIn}
                                size="lg"
                                disabled={isActionLoading}
                                className="px-8 bg-blue-600 hover:bg-blue-500 text-white"
                            >
                                {isActionLoading ? "Đang xử lý..." : "Chấm công vào"}
                            </Button>
                        ) : (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="lg"
                                        className="px-8"
                                        disabled={isActionLoading}
                                    >
                                        {isActionLoading ? "Đang xử lý..." : "Chấm công ra"}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Xác nhận chấm công ra</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bạn có chắc chắn muốn chấm công ra không? Thời gian làm việc hiện tại của
                                            bạn là {workingHours}.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleCheckOut}
                                            className="bg-red-600 hover:bg-red-700"
                                            disabled={isActionLoading}
                                        >
                                            {isActionLoading ? "Đang xử lý..." : "Xác nhận"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}