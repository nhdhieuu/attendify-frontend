"use client"

import {Download} from "lucide-react"
import {Button} from "@/components/ui/button"
import {AnnualReport} from "@/types/reports.interface"
import * as XLSX from "xlsx"
import {saveAs} from "file-saver"

export const AnnualReportButton = ({data}: { data: AnnualReport[] }) => {
    const exportToExcel = () => {
        const mappedData = data.map((item) => ({
            "Tháng/Năm": `${item.month}/${item.year}`,
            "Họ tên": item.user.fullname,
            "Email": item.user.email,
            "Số điện thoại": item.user.phone,
            "Phòng ban": item.user.department?.toUpperCase() ?? "",
            "Tổng ngày công": item.totalWorkingDays,
            "Giờ vào trung bình": item.averageCheckInTime
                ? new Date(item.averageCheckInTime).toLocaleTimeString("vi-VN")
                : "-",
            "Giờ ra trung bình": item.averageCheckOutTime
                ? new Date(item.averageCheckOutTime).toLocaleTimeString("vi-VN")
                : "-",
            "Tổng giờ làm": item.totalHours,
            "Tổng đơn": item.totalRequests,
            "Đã duyệt": item.approvedRequests,
            "Bị từ chối": item.rejectedRequests,
        }))

        const worksheet = XLSX.utils.json_to_sheet(mappedData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Báo cáo năm")

        // Cấu hình độ rộng cột cho dễ nhìn
        worksheet["!cols"] = Object.keys(mappedData[0]).map(() => ({wch: 20}))

        const excelBuffer = XLSX.write(workbook, {bookType: "xlsx", type: "array"})
        const blob = new Blob([excelBuffer], {type: "application/octet-stream"})
        saveAs(blob, `bao_cao_nam_${new Date().getFullYear()}.xlsx`)
    }

    return (
        <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white"
            onClick={exportToExcel}
            disabled={data.length === 0}
        >
            <Download className="h-4 w-4"/>
            Xuất báo cáo năm
        </Button>
    )
}
