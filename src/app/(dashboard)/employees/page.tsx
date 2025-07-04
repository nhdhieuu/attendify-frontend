"use client"

import {useEffect, useState} from "react"
import {Edit, Plus, Search, Trash2, Users} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {DashboardHeader} from "@/components/dashboard-header"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {useForm} from "react-hook-form";
import {CreatUser, ListUsersParams, User} from "@/types/user.interface"
import {createNewUser, getListUsers} from "@/services/user/user.api"
import {Badge} from "@/components/ui/badge";
import LoadingComponent from "@/components/loading";

const departmentMap: Record<string, string> = {
    it: "IT",
    hr: "Nhân sự ",
    finance: "Kinh doanh",
    marketing: "Marketing",
};

export default function EmployeesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [employees, setEmployees] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {errors},
    } = useForm<CreatUser>({
        defaultValues: {
            password: "123456",
            email: "",
            fullname: "",
            phone: "",
            dob: "",
            department: "",
        },
    })
    const onSubmit = async (data: CreatUser) => {
        try {
            const res = await createNewUser(data)
            reset() // Reset form
            setIsDialogOpen(false) // Đóng dialog khi thành công
            await fetchData()
        } catch (error) {
            console.error("Error creating user:", error)
        }
    }
    const watchedDepartment = watch("department")

    const fetchData = async () => {
        try {
            setLoading(true)
            const params: ListUsersParams = {
                page: 1,
                limit: 20
            }
            const res = await getListUsers(params)
            setEmployees(res.data.data)
            setLoading(false)

        } catch (error) {
            console.error("Error fetching employees:", error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    if (loading) return <LoadingComponent/>
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader/>
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Quản lý nhân viên</h1>
                        <p className="text-gray-600 mt-2">Quản lý thông tin và quyền truy cập của nhân viên</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
                                <Plus className="h-4 w-4"/>
                                Thêm nhân viên
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Thêm nhân viên mới</DialogTitle>
                                <DialogDescription>Nhập thông tin nhân viên mới vào hệ thống</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Họ tên
                                        </Label>
                                        <Input id="name"
                                               className="col-span-3"
                                               {...register("fullname", {required: "Họ tên là bắt buộc"})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="email" type="email" className="col-span-3"
                                               {...register("email", {
                                                   required: "Email là bắt buộc",
                                                   pattern: {
                                                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                       message: "Email không hợp lệ",
                                                   },
                                               })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone">
                                            Số điện thoại
                                        </Label>
                                        <Input
                                            id="phone"
                                            className="col-span-3"
                                            {...register("phone", {required: "Số điện thoại là bắt buộc"})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="dob" className="text-right">
                                            Ngày sinh
                                        </Label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            className="col-span-3 w-full"
                                            {...register("dob", {required: "Ngày sinh là bắt buộc"})}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="department" className="text-right">
                                            Phòng ban
                                        </Label>
                                        <Select value={watchedDepartment}
                                                onValueChange={(value) => setValue("department", value)}>
                                            <SelectTrigger
                                                className="col-span-3 w-full">
                                                <SelectValue placeholder="Chọn phòng ban"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="it">IT</SelectItem>
                                                <SelectItem value="hr">Nhân sự</SelectItem>
                                                <SelectItem value="finance">Kinh doanh</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="text-sm text-gray-500 italic">Password mặc định là 123456</div>

                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline"
                                            onClick={() => setIsDialogOpen(false)}>Hủy</Button>
                                    <Button className={"bg-blue-600 hover:bg-blue-500"}>Thêm nhân viên</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5"/>
                            Danh sách nhân viên
                        </CardTitle>
                        <CardDescription>Tổng cộng {employees.length} nhân viên trong hệ thống</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                <Input
                                    placeholder="Tìm kiếm nhân viên..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nhân viên</TableHead>
                                    <TableHead>Ngày sinh</TableHead>
                                    <TableHead>Phòng ban</TableHead>
                                    <TableHead>Admin</TableHead>
                                    <TableHead>Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{employee.fullname.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{employee.fullname}</div>
                                                    <div className="text-sm text-gray-500">{employee.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{employee.dob}</TableCell>
                                        <TableCell>
                                            {departmentMap[employee.department] || employee.department}
                                        </TableCell> <TableCell>
                                        {employee.role === "ADMIN" && (
                                            <Badge className="bg-blue-400 text-white">Admin</Badge>
                                        )}
                                    </TableCell>

                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4"/>
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Trash2 className="h-4 w-4"/>
                                                </Button>
                                            </div>
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
