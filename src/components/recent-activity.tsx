'use client'
import {Clock, LogIn, LogOut} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {OperationHistoryParams} from "@/types/operation.interface";
import {convertOperationHistoryToUI, OperationHistoryUI} from "@/helpers/convertOperationHistory";
import {getOperationHistory} from "@/services/operation/operation.api";
import {useEffect, useState} from "react";

export function RecentActivity() {
    const [activities, setActivities] = useState<OperationHistoryUI[]>([])
    const fetchData = async () => {
        try {
            const params: OperationHistoryParams = {
                page: 1,
                limit: 10,
            }
            const res = await getOperationHistory(params)
            const convertedData = convertOperationHistoryToUI(res.data.data)
            setActivities(convertedData)
        } catch (error) {
            console.error("Error fetching work hours data:", error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>Lịch sử chấm công của bạn</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
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
                                    <Badge variant={activity.status === "success" ? "default" : "destructive"}
                                           className="text-xs">
                                        {activity.status === "success" ? "Đúng giờ" : "Trễ"}
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                    <Clock className="h-3 w-3"/>
                                    <span>{activity.time}</span>
                                    <span>•</span>
                                    <span>{activity.date}</span>
                                    <span>•</span>
                                    <span>{activity.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}