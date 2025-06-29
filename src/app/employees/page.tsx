"use client"

import { useState } from "react"
import { Plus, Search, Users, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EmployeesPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const employees = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "nva@company.com",
            department: "IT",
            position: "Developer",
            status: "active",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 2,
            name: "Trần Thị B",
            email: "ttb@company.com",
            department: "HR",
            position: "HR Manager",
            status: "active",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 3,
            name: "Lê Văn C",
            email: "lvc@company.com",
            department: "Finance",
            position: "Accountant",
            status: "inactive",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 4,
            name: "Phạm Thị D",
            email: "ptd@company.com",
            department: "Marketing",
            position: "Marketing Specialist",
            status: "active",
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ]

    const filteredEmployees = employees.filter(
        (employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Quản lý nhân viên</h1>
                        <p className="text-gray-600 mt-2">Quản lý thông tin và quyền truy cập của nhân viên</p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Thêm nhân viên
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Thêm nhân viên mới</DialogTitle>
                                <DialogDescription>Nhập thông tin nhân viên mới vào hệ thống</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Họ tên
                                    </Label>
                                    <Input id="name" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="department" className="text-right">
                                        Phòng ban
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Chọn phòng ban" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="it">IT</SelectItem>
                                            <SelectItem value="hr">HR</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                            <SelectItem value="marketing">Marketing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="position" className="text-right">
                                        Chức vụ
                                    </Label>
                                    <Input id="position" className="col-span-3" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Hủy</Button>
                                <Button>Thêm nhân viên</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Danh sách nhân viên
                        </CardTitle>
                        <CardDescription>Tổng cộng {employees.length} nhân viên trong hệ thống</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                                    <TableHead>Phòng ban</TableHead>
                                    <TableHead>Chức vụ</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead>Thao tác</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                                                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{employee.name}</div>
                                                    <div className="text-sm text-gray-500">{employee.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.position}</TableCell>
                                        <TableCell>
                                            <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                                                {employee.status === "active" ? "Hoạt động" : "Không hoạt động"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Trash2 className="h-4 w-4" />
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
