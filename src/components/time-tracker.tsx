"use client"

import {useEffect, useState} from "react"
import {Clock, MapPin, Wifi} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {useAuthStore} from "@/stores/useAuthStore"

export function TimeTracker() {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [checkInTime, setCheckInTime] = useState<Date | null>(null)
    const [workingHours, setWorkingHours] = useState("00:00:00")
    const token = useAuthStore(state => state.token)
    const [location, setLocation] = useState<{ latitude: number | null, longitude: number | null }>({
        latitude: null,
        longitude: null
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (err) => {
                console.log(err)
            }
        );
    }, []);
    useEffect(() => {
        console.log(token)
    }, [token]);
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

    const handleCheckIn = () => {
        setIsCheckedIn(true)
        setCheckInTime(new Date())
    }

    const handleCheckOut = () => {
        setIsCheckedIn(false)
        setCheckInTime(null)
        setWorkingHours("00:00:00")
    }

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

                <div className="flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4"/>
                        <span>Văn phòng chính</span>
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
                        </div>
                    )}

                    <div className="flex justify-center space-x-4">
                        {!isCheckedIn ? (
                            <Button onClick={handleCheckIn} size="lg" className="px-8">
                                Chấm công vào
                            </Button>
                        ) : (
                            <Button onClick={handleCheckOut} variant="destructive" size="lg" className="px-8">
                                Chấm công ra
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
