"use client"

import {useState} from "react"
import {CheckCircle, Clock, FileCheck, Plus, XCircle} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {DashboardHeader} from "@/components/dashboard-header"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {DatePickerWithRange} from "@/components/date-range-picker"
import type {DateRange} from "react-day-picker"
import {RequestBody, RequestType} from "@/types/request.interface";
import {createRequestApi} from "@/services/request/request.api";

const requestTypeSelect = [
    {label: "Đi trễ", value: RequestType.LATE_ARRIVAL},
    {label: "Làm online", value: RequestType.REMOTE},
    {label: "Về sớm", value: RequestType.EARLY_LEAVE}
]

export default function RequestsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [requestType, setRequestType] = useState("")
    const [reason, setReason] = useState("")

    const requests = [
        {
            id: 1,
            type: "Đi trễ",
            dateRange: "15/01/2024 - 15/01/2024",
            reason: "Tắc đường do mưa lớn",
            status: "pending",
            submittedAt: "14/01/2024 16:30",
        },
        {
            id: 2,
            type: "Làm online",
            dateRange: "10/01/2024 - 12/01/2024",
            reason: "Con nhỏ ốm, cần chăm sóc tại nhà",
            status: "approved",
            submittedAt: "08/01/2024 09:15",
        },
        {
            id: 3,
            type: "Về sớm",
            dateRange: "05/01/2024 - 05/01/2024",
            reason: "Có việc cá nhân cần giải quyết gấp",
            status: "rejected",
            submittedAt: "04/01/2024 14:20",
        },
        {
            id: 4,
            type: "Làm online",
            dateRange: "20/01/2024 - 22/01/2024",
            reason: "Sửa chữa nhà, không thể đến văn phòng",
            status: "approved",
            submittedAt: "18/01/2024 11:45",
        },
    ]

    /* const filteredRequests = requests.filter(
         (request) =>
             request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
             request.reason.toLowerCase().includes(searchTerm.toLowerCase()),
     )*/

    const handleSubmitRequest = () => {
        if (!dateRange || !requestType || !reason.trim()) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0); // loại bỏ giờ để so sánh chính xác theo ngày

        const from = new Date(dateRange.from ?? new Date());
        const to = new Date(dateRange.to ?? new Date());
        from.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);

        if (from < today || to < today) {
            alert("Ngày bắt đầu và kết thúc không được nhỏ hơn ngày hiện tại");
            return;
        }

        const formatDate = (date: Date) => {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        };

        const requestBody: RequestBody = {
            type: requestType as RequestType,
            fromDate: formatDate(from),
            toDate: formatDate(to),
            reason: reason.trim(),
        };

        console.log(requestBody);
        try {
            const res = createRequestApi(requestBody)
            console.log(res)
            setDateRange(undefined);
            setRequestType("");
            setReason("");
            setIsDialogOpen(false);
            alert("Yêu cầu đã được gửi thành công!");
        } catch (error) {
            console.log(error)
        }

    };


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3"/>
                        Chờ duyệt
                    </Badge>
                )
            case "approved":
                return (
                    <Badge variant="default" className="flex items-center gap-1 bg-green-600">
                        <CheckCircle className="h-3 w-3"/>
                        Đã duyệt
                    </Badge>
                )
            case "rejected":
                return (
                    <Badge variant="destructive" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3"/>
                        Từ chối
                    </Badge>
                )
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader/>
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Yêu cầu</h1>
                        <p className="text-gray-600 mt-2">Tạo và quản lý các yêu cầu chấm công</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 ">
                                <Plus className="h-4 w-4"/>
                                Tạo yêu cầu
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Tạo yêu cầu mới</DialogTitle>
                                <DialogDescription>Điền thông tin yêu cầu của bạn</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div className="space-y-2">
                                    <Label>Khoảng thời gian</Label>
                                    <DatePickerWithRange date={dateRange} setDate={setDateRange}/>
                                </div>

                                <div className="space-y-2">
                                    <Label>Loại yêu cầu</Label>
                                    <Select value={requestType} onValueChange={setRequestType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn loại yêu cầu"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {requestTypeSelect.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Lý do</Label>
                                    <Textarea
                                        placeholder="Nhập lý do chi tiết..."
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        rows={4}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Hủy
                                </Button>
                                <Button className={"bg-blue-600 hover:bg-blue-500"} onClick={handleSubmitRequest}>Gửi
                                    yêu cầu</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileCheck className="h-5 w-5"/>
                                Danh sách yêu cầu
                            </CardTitle>
                            <CardDescription>Tổng cộng {requests.length} yêu cầu đã tạo</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/*<div className="mb-6">
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                    <Input
                                        placeholder="Tìm kiếm yêu cầu..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>*/}

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Loại yêu cầu</TableHead>
                                        <TableHead>Thời gian</TableHead>
                                        <TableHead>Lý do</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                        <TableHead>Ngày gửi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {requests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>
                                                <Badge variant="outline">{request.type}</Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">{request.dateRange}</TableCell>
                                            <TableCell>
                                                <div className="max-w-xs truncate" title={request.reason}>
                                                    {request.reason}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                                            <TableCell
                                                className="text-sm text-gray-500">{request.submittedAt}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Thống kê yêu cầu</CardTitle>
                            <CardDescription>Tổng quan về các yêu cầu của bạn</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                    <div className="text-2xl font-bold text-yellow-600">
                                        {requests.filter((r) => r.status === "pending").length}
                                    </div>
                                    <div className="text-sm text-yellow-700">Chờ duyệt</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {requests.filter((r) => r.status === "approved").length}
                                    </div>
                                    <div className="text-sm text-green-700">Đã duyệt</div>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600">
                                        {requests.filter((r) => r.status === "rejected").length}
                                    </div>
                                    <div className="text-sm text-red-700">Từ chối</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
