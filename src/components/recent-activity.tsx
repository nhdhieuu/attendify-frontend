"use client"
import {Clock, LogIn, LogOut} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Operation, OperationHistoryParams} from "@/types/operation.interface";
import {getOperationHistory} from "@/services/operation/operation.api";
import {useEffect, useState} from "react";

interface Activity {
    type: "check-in" | "check-out"
    time: string
    date: string
    status: "success" | "late" | "early"
    originalDate: Date
}

// Type cho status variant của Badge
type StatusVariant = "default" | "destructive" | "secondary"

export function RecentActivity() {
    const [activities, setActivities] = useState<Activity[]>([])
    const fechData = async () => {
        try {
            const params: OperationHistoryParams = {
                page: 1,
                limit: 10,
            }
            const res = await getOperationHistory(params)
            console.log(res.data.data)
            const data = transformJsonToActivities(res.data.data)
            setActivities(data)
        } catch (error) {
            console.error("Error fetching work hours data:", error)
        }
    }
    useEffect(() => {
        fechData()
    }, [])
    const transformJsonToActivities = (data: Operation[]): Activity[] => {
        const activities: Activity[] = []

        data.forEach((record: Operation) => {
            // Tạo activity cho check-in
            if (record.checkIn) {
                const checkInTime = new Date(record.checkIn)
                activities.push({
                    type: "check-in",
                    time: checkInTime.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }),
                    date: formatDate(record.workDate),
                    status: record.statusIn === "ONTIME" ? "success" : "late",
                    originalDate: new Date(record.workDate)
                })
            }

            if (record.checkOut) {
                const checkOutTime = new Date(record.checkOut)
                activities.push({
                    type: "check-out",
                    time: checkOutTime.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }),
                    date: formatDate(record.workDate),
                    status: record.statusOut === "EARLY" ? "early" : "success",
                    originalDate: new Date(record.workDate)
                })
            }
        })

        return activities.sort((a: Activity, b: Activity) => {
            if (a.originalDate.getTime() !== b.originalDate.getTime()) {
                return b.originalDate.getTime() - a.originalDate.getTime()
            }
            return a.type === "check-out" ? -1 : 1
        })
    }

    // Hàm format ngày tháng
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(today.getDate() - 1)

        const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
        const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate())

        if (dateOnly.getTime() === todayOnly.getTime()) {
            return "Hôm nay"
        } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
            return "Hôm qua"
        } else {
            const diffTime = todayOnly.getTime() - dateOnly.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return `${diffDays} ngày trước`
        }
    }

    const getStatusText = (status: Activity['status']): string => {
        switch (status) {
            case "success":
                return "Đúng giờ"
            case "late":
                return "Trễ"
            case "early":
                return "Sớm"
            default:
                return "Đúng giờ"
        }
    }

    const getStatusVariant = (status: Activity['status']): StatusVariant => {
        switch (status) {
            case "success":
                return "default"
            case "late":
                return "destructive"
            case "early":
                return "secondary"
            default:
                return "default"
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>Lịch sử chấm công của bạn</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity: Activity, index: number) => (
                        <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                            <div className="flex-shrink-0">
                                {activity.type === "check-in" ? (
                                    <LogIn className="h-5 w-5 text-green-600"/>
                                ) : (
                                    <LogOut className="h-5 w-5 text-red-600"/>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        {activity.type === "check-in" ? "Chấm công vào" : "Chấm công ra"}
                                    </p>
                                    <Badge
                                        variant={getStatusVariant(activity.status)}
                                        className="text-xs"
                                    >
                                        {getStatusText(activity.status)}
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                    <Clock className="h-3 w-3"/>
                                    <span>{activity.time}</span>
                                    <span>•</span>
                                    <span>{activity.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}