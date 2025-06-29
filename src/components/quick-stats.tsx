import { Calendar, Clock, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function QuickStats() {
    const stats = [
        {
            title: "Tháng này",
            value: "22/23",
            description: "Ngày công",
            icon: Calendar,
            color: "text-blue-600",
        },
        {
            title: "Hôm nay",
            value: "8.5h",
            description: "Giờ làm việc",
            icon: Clock,
            color: "text-green-600",
        },
        {
            title: "Tuần này",
            value: "42h",
            description: "Tổng giờ",
            icon: TrendingUp,
            color: "text-purple-600",
        },
        {
            title: "Đúng giờ",
            value: "95%",
            description: "Tỷ lệ",
            icon: Users,
            color: "text-orange-600",
        },
    ]

    return (
        <div className="space-y-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-xs text-gray-500">{stat.description}</p>
                            </div>
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
