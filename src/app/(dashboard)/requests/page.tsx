"use client"

import {useEffect, useState} from "react"
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
import {ListRequestParams, RequestBody, RequestResponse, RequestStatus, RequestType} from "@/types/request.interface";
import {approveRequest, createRequestApi, getListRequests, rejectRequest} from "@/services/request/request.api";
import {formatDateToYMD} from "@/helpers/extractTimeHHMM";
import LoadingComponent from "@/components/loading"
import {getUserId, getUserRole} from "@/services/cookies"
import {useAuthStore} from "@/stores/useAuthStore";
import {toast} from "react-toastify";

const requestTypeSelect = [
    {label: "Đi trễ", value: RequestType.LATE_ARRIVAL},
    {label: "Làm online", value: RequestType.REMOTE},
    {label: "Về sớm", value: RequestType.EARLY_LEAVE}
]

function getRequestBadgeProps(type: RequestType): {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline" | null | undefined
} {
    switch (type) {
        case RequestType.LATE_ARRIVAL:
            return {label: "Đi trễ", variant: "destructive"};
        case RequestType.REMOTE:
            return {label: "Làm online", variant: "secondary"};
        case RequestType.EARLY_LEAVE:
            return {label: "Về sớm", variant: "outline"};
        default:
            return {label: "Không xác định", variant: "outline"};
    }
}

export default function RequestsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dateRange, setDateRange] = useState<DateRange | undefined>()
    const [requestType, setRequestType] = useState("")
    const [reason, setReason] = useState("")
    const [listRequests, setListRequests] = useState<RequestResponse[]>([])
    const [loading, setLoading] = useState(true)
    const user = useAuthStore((state) => state.user)
    const fetchData = async () => {
        try {
            const userId = await getUserId()
            const role = await getUserRole()
            const params: ListRequestParams = {
                page: 1,
                limit: 100,
                status: null,
                userId: role == "ADMIN" ? null : userId || ""
            }
            const res = await getListRequests(params)
            setListRequests(res.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const onApproveRequest = async (id: string) => {
        try {
            const res = await approveRequest(id)
            console.log(res.data)
            toast.success("Duyệt thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            await fetchData()
        } catch (error) {
            console.log(error)
        }
    }
    const onRejectRequest = async (id: string) => {
        try {
            const res = await rejectRequest(id)
            console.log(res.data)
            toast.success("Từ chối thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            await fetchData()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmitRequest = async () => {
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

        try {
            const res = createRequestApi(requestBody)
            setDateRange(undefined);
            setRequestType("");
            setReason("");
            setIsDialogOpen(false);
            await fetchData()
            toast.success("Tạo yêu cầu thành công", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.log(error)
        }

    };


    const getStatusBadge = (status: RequestStatus) => {
        switch (status) {
            case RequestStatus.PENDING:
                return (
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3"/>
                        Chờ duyệt
                    </Badge>
                )
            case RequestStatus.APPROVED:
                return (
                    <Badge variant="default" className="flex items-center gap-1 bg-green-600">
                        <CheckCircle className="h-3 w-3"/>
                        Đã duyệt
                    </Badge>
                )
            case RequestStatus.REJECTED:
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
    if (loading) return <LoadingComponent/>
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
                            <CardDescription>Tổng cộng {listRequests.length} yêu cầu đã tạo</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Loại yêu cầu</TableHead>
                                        {user?.role == "ADMIN" && <TableHead>Người gửi</TableHead>}
                                        <TableHead>Thời gian</TableHead>
                                        <TableHead>Lý do</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                        <TableHead>Ngày gửi</TableHead>
                                        {user?.role == "ADMIN" && <TableHead>Hành động</TableHead>}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {listRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>
                                                {(() => {
                                                    const {label, variant} = getRequestBadgeProps(request.type);
                                                    return (
                                                        <Badge variant={variant}
                                                               className="w-24 justify-center text-center">
                                                            {label}
                                                        </Badge>
                                                    );
                                                })()}
                                            </TableCell>

                                            {
                                                user?.role == "ADMIN" &&
                                                <TableCell
                                                    className="font-medium">{request.user.fullname}
                                                </TableCell>
                                            }
                                            <TableCell
                                                className="font-medium">{request.fromDate} -{">"} {request.toDate}
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs truncate" title={request.reason}>
                                                    {request.reason}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                                            <TableCell
                                                className="text-sm text-gray-500">{formatDateToYMD(request.createdAt)}
                                            </TableCell>
                                            {user?.role === "ADMIN" && (
                                                <TableCell>
                                                    {request.status === RequestStatus.PENDING ? (
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                className="bg-green-600 hover:bg-green-500"
                                                                onClick={() => onApproveRequest(request.id)}
                                                            >
                                                                <CheckCircle className="w-4 h-4 mr-1"/>
                                                                Duyệt
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                className="text-red-600 hover:text-red-600 border-red-600 hover:bg-red-50"
                                                                onClick={() => {
                                                                    onRejectRequest(request.id)
                                                                }}
                                                            >
                                                                <XCircle className="w-4 h-4 mr-1"/>
                                                                Từ chối
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                </TableCell>
                                            )}
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
                                        {listRequests.filter((r) => r.status === RequestStatus.PENDING).length}
                                    </div>
                                    <div className="text-sm text-yellow-700">Chờ duyệt</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {listRequests.filter((r) => r.status === RequestStatus.APPROVED).length}
                                    </div>
                                    <div className="text-sm text-green-700">Đã duyệt</div>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded-lg">
                                    <div className="text-2xl font-bold text-red-600">
                                        {listRequests.filter((r) => r.status === RequestStatus.REJECTED).length}
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
