"use client"

import {useEffect, useState} from "react"
import {Download, Filter} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {DashboardHeader} from "@/components/dashboard-header"
import {getAnnualReport, getMonthlyReport} from "@/services/report/report.api";
import {AnnualReport, AttendanceReport, AttendanceReportParams} from "@/types/reports.interface";
import {CheckInStatus, CheckOutStatus} from "@/types/operation.interface";
import {extractTimeHHMM} from "@/helpers/extractTimeHHMM";
import LoadingComponent from "@/components/loading";
import * as XLSX from 'xlsx';
import {AnnualReportButton} from "@/components/annualReportButton";

export default function ReportsPage() {
    const currentMonth = (new Date().getMonth() + 1).toString();
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState("2025")
    const [loading, setLoading] = useState(false)
    const [reportsData, setReportsData] = useState<AttendanceReport[]>([])
    const [annualReports, setAnnualReports] = useState<AnnualReport[]>([])

    const fetchData = async (): Promise<void> => {
        try {
            setLoading(true)
            const params: AttendanceReportParams = {
                month: parseInt(selectedMonth),
                year: parseInt(selectedYear),
            }
            const res = await getMonthlyReport(params)
            const annualRes = await getAnnualReport({year: new Date().getFullYear()})
            setAnnualReports(annualRes.data)
            setReportsData(res.data)
            console.log("Report Data:", res.data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching report data:", error)
        }
    }

    const exportToExcel = () => {
        if (reportsData.length === 0) {
            alert('Không có dữ liệu để xuất');
            return;
        }

        // Tạo worksheet data với header
        const worksheetData = [
            // Header chính
            [`BÁO CÁO CHẤM CÔNG THÁNG ${selectedMonth}/${selectedYear}`],
            [], // Dòng trống
            // Header bảng
            [
                'STT',
                'Họ và tên',
                'Email',
                'Phòng ban',
                'Ngày',
                'Giờ vào',
                'Giờ ra',
                'Tổng giờ (h)',
                'Trạng thái Check-in',
                'Trạng thái Check-out',
                'Tổng yêu cầu',
                'YC được duyệt',
                'YC bị từ chối'
            ],
            // Dữ liệu
            ...reportsData.map((row, index) => [
                index + 1,
                row.user.fullname,
                row.user.email,
                row.user.department,
                new Date(row.date).toLocaleDateString('vi-VN'),
                row.checkInTime ? extractTimeHHMM(row.checkInTime) : '-',
                row.checkOutTime ? extractTimeHHMM(row.checkOutTime) : '-',
                row.totalHours.toFixed(1),
                row.checkInStatus === CheckInStatus.ONTIME ? 'Đúng giờ' : 'Trễ',
                row.checkOutStatus === CheckOutStatus.ONTIME ? 'Đúng giờ' : 'Sớm',
                row.totalRequests,
                row.approvedRequests,
                row.rejectedRequests
            ])
        ];

        // Tạo workbook và worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Styling cho header chính
        const headerRange = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

        // Merge cells cho header chính
        worksheet['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: 12}} // Merge từ A1 đến M1
        ];

        // Set column widths
        worksheet['!cols'] = [
            {width: 5},   // STT
            {width: 20},  // Họ và tên
            {width: 25},  // Email
            {width: 15},  // Phòng ban
            {width: 12},  // Ngày
            {width: 10},  // Giờ vào
            {width: 10},  // Giờ ra
            {width: 12},  // Tổng giờ
            {width: 18},  // Trạng thái Check-in
            {width: 18},  // Trạng thái Check-out
            {width: 12},  // Tổng yêu cầu
            {width: 12},  // YC được duyệt
            {width: 12}   // YC bị từ chối
        ];

        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, `Báo cáo ${selectedMonth}-${selectedYear}`);

        // Xuất file
        const fileName = `Bao_cao_cham_cong_${selectedMonth}_${selectedYear}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    useEffect(() => {
        fetchData()
    }, []);

    if (loading) return <LoadingComponent/>

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader/>
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Báo cáo chấm công</h1>
                    <p className="text-gray-600 mt-2">Xem và xuất báo cáo chi tiết theo tháng, năm</p>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5"/>
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
                                        <SelectValue placeholder="Chọn tháng"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Tháng 1</SelectItem>
                                        <SelectItem value="2">Tháng 2</SelectItem>
                                        <SelectItem value="3">Tháng 3</SelectItem>
                                        <SelectItem value="4">Tháng 4</SelectItem>
                                        <SelectItem value="5">Tháng 5</SelectItem>
                                        <SelectItem value="6">Tháng 6</SelectItem>
                                        <SelectItem value="7">Tháng 7</SelectItem>
                                        <SelectItem value="8">Tháng 8</SelectItem>
                                        <SelectItem value="9">Tháng 9</SelectItem>
                                        <SelectItem value="10">Tháng 10</SelectItem>
                                        <SelectItem value="11">Tháng 11</SelectItem>
                                        <SelectItem value="12">Tháng 12</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Năm</label>
                                <Select value={selectedYear} onValueChange={setSelectedYear}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Chọn năm"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2025">2025</SelectItem>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2023">2023</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                                <Button variant="outline" onClick={fetchData}>
                                    Lọc
                                </Button>
                                <Button
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500"
                                    onClick={exportToExcel}
                                    disabled={reportsData.length === 0}
                                >
                                    <Download className="h-4 w-4"/>
                                    Xuất Excel
                                </Button>
                                <AnnualReportButton data={annualReports}/>
                            </div>

                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Chi tiết chấm công</CardTitle>
                        <CardDescription>Báo cáo chi tiết cho tháng {selectedMonth}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {
                            reportsData.length <= 0 ? <div className="flex items-center gap-2">No Data</div> : (<Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ngày</TableHead>
                                        <TableHead>Giờ vào</TableHead>
                                        <TableHead>Giờ ra</TableHead>
                                        <TableHead>Tổng giờ</TableHead>
                                        <TableHead>Trạng thái checkin</TableHead>
                                        <TableHead>Trạng thái checkout</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reportsData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{row.date}</TableCell>
                                            <TableCell>{extractTimeHHMM(row.checkInTime)}</TableCell>
                                            <TableCell>{extractTimeHHMM(row.checkOutTime)}</TableCell>
                                            <TableCell>{row.totalHours.toFixed(1)}h</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={row.checkInStatus === CheckInStatus.ONTIME ? "default" : "destructive"}>{row.checkInStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={row.checkOutStatus === CheckOutStatus.ONTIME ? "default" : "destructive"}>{row.checkOutStatus}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>)
                        }
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}