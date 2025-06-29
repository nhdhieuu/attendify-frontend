"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

const data = [
    { day: "T2", hours: 8.5 },
    { day: "T3", hours: 8.0 },
    { day: "T4", hours: 9.0 },
    { day: "T5", hours: 8.5 },
    { day: "T6", hours: 7.5 },
    { day: "T7", hours: 4.0 },
    { day: "CN", hours: 0 },
]

export function AttendanceChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Biểu đồ giờ làm việc</CardTitle>
                <CardDescription>Thống kê giờ làm việc trong tuần</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        hours: {
                            label: "Giờ làm việc",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="h-[200px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => [`${value}h`, "Giờ làm việc"]}
                                labelFormatter={(label) => `Thứ ${label}`}
                            />
                            <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
