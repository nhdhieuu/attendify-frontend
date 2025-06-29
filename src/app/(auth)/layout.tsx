import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "../globals.css"

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Đăng nhập - Hệ thống chấm công",
    description: "Đăng nhập vào hệ thống quản lý chấm công nhân viên",
}

export default function AuthLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="vi">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
