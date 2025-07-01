"use client"

import {Bar, BarChart, Tooltip, XAxis, YAxis} from "recharts"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {ChartContainer} from "@/components/ui/chart"
import {getOperationHistory} from "@/services/operation/operation.api";
import {OperationHistoryParams} from "@/types/operation.interface";
import {useEffect, useState} from "react";
import {convertOperationHistoryToChartData} from "@/helpers/convertToChartData";

export interface WorkHourChartData {
    day: string
    hours: number
}


export function AttendanceChart() {
    const [chartData, setChartData] = useState<WorkHourChartData[]>([])

    const fetchData = async () => {
        try {
            const params: OperationHistoryParams = {
                page: 1,
                limit: 14,
            }
            const res = await getOperationHistory(params)
            const convertedData = convertOperationHistoryToChartData(res.data.data)
            setChartData(convertedData)
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
                    <BarChart data={chartData}>
                        <XAxis dataKey="day"/>
                        <YAxis/>
                        <Tooltip
                            formatter={(value) => [`${value}h`, "Giờ làm việc"]}
                            labelFormatter={(label) => `Thứ ${label}`}
                        />
                        <Bar dataKey="hours" fill="#2563eb" radius={[4, 4, 0, 0]}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
