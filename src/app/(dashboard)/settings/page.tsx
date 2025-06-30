"use client"

import {User} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {DashboardHeader} from "@/components/dashboard-header"
import {useAuthStore} from "@/stores/useAuthStore"

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user)
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader/>
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
                    <p className="text-gray-600 mt-2">Quản lý cài đặt tài khoản và hệ thống</p>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5"/>
                                Thông tin cá nhân
                            </CardTitle>
                            <CardDescription>Cập nhật thông tin hồ sơ của bạn</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullname">Họ và tên</Label>
                                    <Input disabled id="fullname" defaultValue={user?.fullname}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Phòng ban</Label>
                                    <Input disabled id="department" defaultValue={user?.department}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input disabled id="email" type="email" defaultValue={user?.email}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input disabled id="phone" defaultValue={user?.phone}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Ngày sinh</Label>
                                    <Input disabled id="dob" defaultValue={user?.dob}/>
                                </div>
                            </div>
                            {/*<Button className={"bg-blue-600 hover:bg-blue-500"}>Cập nhật thông tin</Button>*/}
                        </CardContent>
                    </Card>

                    {/* <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Thông báo
                            </CardTitle>
                            <CardDescription>Cấu hình các loại thông báo bạn muốn nhận</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Thông báo email</Label>
                                    <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Nhắc nhở chấm công</Label>
                                    <p className="text-sm text-gray-500">Nhắc nhở khi quên chấm công</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Báo cáo hàng tháng</Label>
                                    <p className="text-sm text-gray-500">Nhận báo cáo tự động hàng tháng</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>*/}

                    {/*<Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5"/>
                                Bảo mật
                            </CardTitle>
                            <CardDescription>Cài đặt bảo mật và xác thực</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Đổi mật khẩu</Label>
                                <div className="space-y-2">
                                    <Input type="password" placeholder="Mật khẩu hiện tại"/>
                                    <Input type="password" placeholder="Mật khẩu mới"/>
                                    <Input type="password" placeholder="Xác nhận mật khẩu mới"/>
                                </div>
                                <Button className={"bg-blue-600 hover:bg-blue-500"}>Đổi mật
                                    khẩu</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Xác thực 2 bước</Label>
                                    <p className="text-sm text-gray-500">Tăng cường bảo mật tài khoản</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>*/}

                    {/*<Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                Tùy chọn hệ thống
                            </CardTitle>
                            <CardDescription>Cấu hình ngôn ngữ và múi giờ</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Ngôn ngữ</Label>
                                <Select defaultValue="vi">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Múi giờ</Label>
                                <Select defaultValue="asia/ho_chi_minh">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="asia/ho_chi_minh">Asia/Ho Chi Minh</SelectItem>
                                        <SelectItem value="utc">UTC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>*/}
                </div>
            </main>
        </div>
    )
}
