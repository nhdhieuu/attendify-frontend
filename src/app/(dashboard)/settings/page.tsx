"use client"

import {Shield, User} from "lucide-react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {DashboardHeader} from "@/components/dashboard-header"
import {useAuthStore} from "@/stores/useAuthStore"
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {useState} from "react";
import {toast} from "react-toastify"
import {changePassword} from "@/services/user/user.api";

export default function SettingsPage() {
    const user = useAuthStore((state) => state.user)

    // State cho form đổi mật khẩu
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Handle input change
    const handlePasswordInputChange = (field, value) => {
        setPasswordForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Validate password form
    const validatePasswordForm = () => {
        if (!passwordForm.currentPassword) {
            toast.error("Vui lòng nhập mật khẩu hiện tại");
            return false;
        }
        if (!passwordForm.newPassword) {
            toast.error("Vui lòng nhập mật khẩu mới");
            return false;
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
            return false;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp");
            return false;
        }
        if (passwordForm.currentPassword === passwordForm.newPassword) {
            toast.error("Mật khẩu mới phải khác mật khẩu hiện tại");
            return false;
        }
        return true;
    };

    // Handle password change
    const handleChangePassword = async () => {
        if (!validatePasswordForm()) return;

        setIsChangingPassword(true);

        try {
            // API call để đổi mật khẩu
            const response = await changePassword({password: passwordForm.newPassword});

            if (response.status === 200) {
                toast.success("Đổi mật khẩu thành công");
                // Reset form
                setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                toast.error(response.message || "Có lỗi xảy ra khi đổi mật khẩu");
            }
        } catch (error) {
            console.error('Password change error:', error);
            toast.error("Có lỗi xảy ra khi đổi mật khẩu");
        } finally {
            setIsChangingPassword(false);
        }
    };

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
                                    <Label htmlFor="fullname">Họ và tên</Label>
                                    <Input disabled id="fullname" defaultValue={user?.fullname}/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Phòng ban</Label>
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
                                    <Label htmlFor="dob">Ngày sinh</Label>
                                    <Input disabled id="dob" defaultValue={user?.dob}/>
                                </div>
                            </div>
                            {/*<Button className={"bg-blue-600 hover:bg-blue-500"}>Cập nhật thông tin</Button>*/}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5"/>
                                Bảo mật
                            </CardTitle>
                            <CardDescription>Cài đặt bảo mật và xác thực</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <Label>Đổi mật khẩu</Label>
                                <div className="space-y-3">
                                    <Input
                                        type="password"
                                        placeholder="Mật khẩu hiện tại"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Mật khẩu mới"
                                        value={passwordForm.newPassword}
                                        onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Xác nhận mật khẩu mới"
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                                    />
                                </div>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-500"
                                    onClick={handleChangePassword}
                                    disabled={isChangingPassword}
                                >
                                    {isChangingPassword ? "Đang đổi..." : "Đổi mật khẩu"}
                                </Button>
                            </div>
                            <Separator/>
                        </CardContent>
                    </Card>

                </div>
            </main>
        </div>
    )
}