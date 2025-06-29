"use client"

import { useState } from "react"
import { Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"

export default function ReportsPage() {
    const [selectedMonth, setSelectedMonth] = useState("2024-01")
    const [selectedYear, setSelectedYear] = useState("2024")

    const reportData = [
        { date: "01/01/2024", checkIn: "08:30", checkOut: "17:30", hours: "8.5", status: "Đúng giờ" },
        { date: "02/01/2024", checkIn: "08:45", checkOut: "17:45", hours: "8.5", status: "Trễ" },
        { date: "03/01/2024", checkIn: "08:15", checkOut: "17:15", hours: "8.5", status: "Đúng giờ" },
        { date: "04/01/2024", checkIn: "08:30", checkOut: "18:00", hours: "9.0", status: "Đúng giờ" },
        { date: "05/01/2024", checkIn: "08:30", checkOut: "17:30", hours: "8.5", status: "Đúng giờ" },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Báo cáo chấm công</h1>
                    <p className="text-gray-600 mt-2">Xem và xuất báo cáo chi tiết theo tháng, năm</p>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Bộ lọc báo cáo
                        </CardTitle>
                        <CardDescription>Chọn khoảng thời gian để xem báo cáo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tháng</label>
                                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Chọn tháng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024-01">Tháng 1, 2024</SelectItem>
                                        <SelectItem value="2024-02">Tháng 2, 2024</SelectItem>
                                        <SelectItem value="2024-03">Tháng 3, 2024</SelectItem>
                                        <SelectItem value="2024-04">Tháng 4, 2024</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Năm</label>
                                <Select value={selectedYear} onValueChange={setSelectedYear}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Chọn năm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                        <SelectItem value="2022">2022</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button className="flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Xuất Excel
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Chi tiết chấm công</CardTitle>
                        <CardDescription>Báo cáo chi tiết cho tháng {selectedMonth}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ngày</TableHead>
                                    <TableHead>Giờ vào</TableHead>
                                    <TableHead>Giờ ra</TableHead>
                                    <TableHead>Tổng giờ</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reportData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{row.date}</TableCell>
                                        <TableCell>{row.checkIn}</TableCell>
                                        <TableCell>{row.checkOut}</TableCell>
                                        <TableCell>{row.hours}h</TableCell>
                                        <TableCell>
                                            <Badge variant={row.status === "Đúng giờ" ? "default" : "destructive"}>{row.status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
