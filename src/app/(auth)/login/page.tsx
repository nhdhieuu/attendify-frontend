"use client"

import type React from "react"
import {useState} from "react"
import {Chrome, Clock, Eye, EyeOff, Lock, Mail} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Checkbox} from "@/components/ui/checkbox"
import {Separator} from "@/components/ui/separator"
import {Alert, AlertDescription} from "@/components/ui/alert"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error when user starts typing
        if (error) setError("")
    }

    const handleRememberMeChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            rememberMe: checked,
        }))
    }

    const validateForm = () => {
        if (!formData.email) {
            setError("Vui lòng nhập email")
            return false
        }
        if (!formData.email.includes("@")) {
            setError("Email không hợp lệ")
            return false
        }
        if (!formData.password) {
            setError("Vui lòng nhập mật khẩu")
            return false
        }
        if (formData.password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự")
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)
        setError("")

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Mock authentication logic
            if (formData.email === "admin@company.com" && formData.password === "123456") {
                // Redirect to dashboard
                window.location.href = "/"
            } else {
                setError("Email hoặc mật khẩu không chính xác")
            }
        } catch (err) {
            setError("Đã xảy ra lỗi. Vui lòng thử lại.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleOAuthLogin = (provider: string) => {
        setIsLoading(true)
        // Simulate OAuth redirect
        setTimeout(() => {
            alert(`Đang chuyển hướng đến ${provider}...`)
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Clock className="h-10 w-10 text-blue-600"/>
                        <span className="text-3xl font-bold text-gray-900">TimeTracker</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Chào mừng trở lại</h1>
                    <p className="text-gray-600">Đăng nhập vào hệ thống chấm công</p>
                </div>

                <Card className="shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl text-center">Đăng nhập</CardTitle>
                        <CardDescription className="text-center">Nhập thông tin đăng nhập của bạn</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* OAuth Login Buttons */}
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full bg-transparent"
                                onClick={() => handleOAuthLogin("Google")}
                                disabled={isLoading}
                            >
                                <Chrome className="mr-2 h-4 w-4"/>
                                Đăng nhập với Google
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full"/>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Hoặc</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="your.email@company.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <div className="relative">
                                    <Lock
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Nhập mật khẩu"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400"/>
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400"/>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="rememberMe"
                                        checked={formData.rememberMe}
                                        onCheckedChange={handleRememberMeChange}
                                        disabled={isLoading}
                                    />
                                    <Label htmlFor="rememberMe" className="text-sm">
                                        Ghi nhớ đăng nhập
                                    </Label>
                                </div>

                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
