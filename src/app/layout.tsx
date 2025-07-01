import type React from "react"
import type {Metadata} from "next"
import {Inter} from "next/font/google"
import "./globals.css"
import {ToastContainer} from "react-toastify";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
    title: "Hệ thống chấm công",
    description: "Ứng dụng quản lý chấm công nhân viên",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (

        <html lang="vi">
        <body className={inter.className}>
        <ToastContainer/>
        {children}
        </body>
        </html>
    )
}
