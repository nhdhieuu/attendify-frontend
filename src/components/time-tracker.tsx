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
import {checkIn, checkOut, getCurrentOperationStatus} from "@/services/operation/operation.api";
import LoadingComponent from "@/components/loading";
import {CheckInOutBody} from "@/types/operation.interface";
import {toast} from "react-toastify"
import {convertMinutesToHourMinute} from "@/helpers/convertMinutesToHourMinute";

export interface LocationData {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    address: {
        office: string;
        house_number: string;
        road: string;
        city_district: string;
        city: string;
        "ISO3166-2-lvl4": string;
        postcode: string;
        country: string;
        country_code: string;
    };
    boundingbox: [string, string, string, string]; // [min_lat, max_lat, min_lon, max_lon]
}

export function TimeTracker() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [loading, setLoading] = useState(false)
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [checkInTime, setCheckInTime] = useState<Date | null>(null)
    const [workingHours, setWorkingHours] = useState("00:00:00")
    const [address, setAddress] = useState<string>("")
    const [lateDiff, setLateDiff] = useState<number>(0);
    const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
        latitude: null,
        longitude: null,
    })
    const currentStatus = async () => {
        try {
            setLoading(true)
            const res = await getCurrentOperationStatus()
            console.log(res.data)

            setIsCheckedIn(res.data.isCheckIn)

            if (res.data.isCheckIn && res.data.checkInTime && !res.data.isCheckOut) {
                const checkInDate = new Date(res.data.checkInTime);
                setCheckInTime(checkInDate);

                const eightAM = new Date(checkInDate);
                eightAM.setHours(8, 0, 0, 0); // 8:00:00.000

                if (checkInDate > eightAM) {
                    const diffMs = checkInDate.getTime() - eightAM.getTime();
                    const diffMins = Math.floor(diffMs / (1000 * 60)); // chuyển sang phút
                    setLateDiff(diffMins);
                } else {
                    setLateDiff(0); // không đi trễ
                }
            } else if (res.data.isCheckIn && res.data.checkInTime && res.data.isCheckOut) {
                setIsCheckedIn(false)
                setCheckInTime(null);
                setLateDiff(0);
                setWorkingHours("00:00:00");
            } else {
                // Nếu không còn checkIn, reset lại các trạng thái liên quan
                setCheckInTime(null);
                setLateDiff(0);
                setWorkingHours("00:00:00");
            }

            setLoading(false)
        } catch (err) {
            console.log("Error getting current status", err)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (location.latitude && location.longitude) {
            getAddress();
        }
    }, [location.latitude, location.longitude]);

    const getAddress = async () => {
        if (!location.latitude || !location.longitude) {
            console.log("Location not available yet");
            return;
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json&addressdetails=1`,
                {
                    headers: {
                        'User-Agent': 'MyReactNativeApp/1.0 (phanchauhoang2004@example.com)',
                    },
                }
            );
            const data: LocationData = await res.json();
            console.log(data);
            setAddress(data.display_name);
        } catch (error) {
            console.log("Error getting address:", error);
        }
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            },
            (err) => {
                console.log(err)
            },
        )

        currentStatus()
    }, [])
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())

            if (checkInTime) {
                const diff = new Date().getTime() - checkInTime.getTime()
                const hours = Math.floor(diff / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)
                setWorkingHours(
                    `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
                )
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [checkInTime])

    const handleCheckIn = async () => {
        const checkInBody: CheckInOutBody = {
            latitude: "10.757796668746575",
            longitude: "106.64116568100889",
        };

        try {
            const res = await checkIn(checkInBody);
            if (res.status === 200) {
                setIsCheckedIn(true);
                setCheckInTime(new Date(res.data.time));
                toast.success("Check-in thành công");
            } else {
                toast.error("Check-in thất bại, xin hãy thử lại!");
            }
        } catch {
            toast.error("Check-in thất bại, xin hãy thử lại!");
        }
    };


    const handleCheckOut = async () => {
        const checkInBody: CheckInOutBody = {
            latitude: "10.757796668746575",
            longitude: "106.64116568100889",
        };

        try {
            const res = await checkOut(checkInBody);
            if (res.status === 200) {
                setIsCheckedIn(false)
                setCheckInTime(null)
                setWorkingHours("00:00:00")
                toast.success("Check-out thành công");
            } else {
                toast.error("Check-out thất bại, xin hãy thử lại!");
            }
        } catch {
            toast.error("Check-out thất bại, xin hãy thử lại!");
        }


    }
    if (loading) return <LoadingComponent/>

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5"/>
                    Chấm công
                </CardTitle>
                <CardDescription>Theo dõi thời gian làm việc của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <div
                        className="text-4xl font-mono font-bold text-gray-900">{currentTime.toLocaleTimeString("vi-VN")}</div>
                    <div className="text-sm text-gray-600 mt-1">{currentTime.toLocaleDateString("vi-VN")}</div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4"/>
                        <span>{address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Wifi className="h-4 w-4"/>
                        <span>Kết nối ổn định</span>
                    </div>
                </div>


                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <Badge variant={isCheckedIn ? "default" : "secondary"} className="px-4 py-2">
                            {isCheckedIn ? "Đang làm việc" : "Chưa chấm công"}
                        </Badge>
                    </div>

                    {isCheckedIn && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600">Thời gian làm việc hôm nay</p>
                            <div className="text-2xl font-mono font-bold text-blue-600">{workingHours}</div>
                            <p className="text-xs text-gray-500">Bắt đầu
                                lúc: {checkInTime?.toLocaleTimeString("vi-VN")}</p>
                            {lateDiff > 0 && (
                                <p className="text-xs text-red-500">Trễ: {convertMinutesToHourMinute(lateDiff)}</p>
                            )}

                        </div>
                    )}

                    <div className="flex justify-center space-x-4">
                        {!isCheckedIn ? (
                            <Button onClick={handleCheckIn} size="lg"
                                    className="px-8 bg-blue-600 hover:bg-blue-500 text-white">
                                Chấm công vào
                            </Button>
                        ) : (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="lg" className="px-8">
                                        Chấm công ra
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
                                        <AlertDialogAction onClick={handleCheckOut}
                                                           className="bg-red-600 hover:bg-red-700">
                                            Xác nhận
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
