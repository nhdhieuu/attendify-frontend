"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {Clock, FileCheck, FileText, Home, Settings, Users} from "lucide-react"
import {cn} from "@/lib/utils"
import {useAuthStore} from "@/stores/useAuthStore";

const navigation = [
    {name: "Trang chủ", href: "/", icon: Home},
    {name: "Yêu cầu", href: "/requests", icon: FileCheck},
    {name: "Báo cáo", href: "/reports", icon: FileText},
    {name: "Nhân viên", href: "/employees", icon: Users},
    {name: "Cài đặt", href: "/settings", icon: Settings},
]

export function Navigation() {
    const pathname = usePathname()
    const user = useAuthStore(state => state.user)
    const filteredNavigation = navigation.filter(
        (item) => item.href !== "/employees" || user?.role === "ADMIN"
    );

    return (
        <nav className="w-64 bg-white border-r border-gray-200 shadow-sm">
            <div className="p-6">
                <div className="flex items-center space-x-2">
                    <Clock className="h-8 w-8 text-blue-600"/>
                    <span className="text-xl font-bold text-gray-900">Attendify</span>
                </div>
            </div>

            <div className="px-3">
                <ul className="space-y-1">
                    {filteredNavigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    pathname === item.href
                                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5"/>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
