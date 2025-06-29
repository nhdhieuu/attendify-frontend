import type React from "react"
import {Navigation} from "@/components/navigation"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <Navigation/>
            <div className="flex-1">{children}</div>
        </div>
    )
}
