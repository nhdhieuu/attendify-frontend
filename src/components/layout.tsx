"use client"
import type React from "react"
import {Navigation} from "@/components/navigation"
import {usePathname} from "next/navigation";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    // If the pathname starts with "/auth", we don't render the navigation
    if (pathname.startsWith("/login") || pathname.startsWith("/isSignedIn")) {
        return <>{children}</>
    }
    return (
        <div className="flex min-h-screen">
            <Navigation/>
            <div className="flex-1">{children}</div>
        </div>
    )
}
