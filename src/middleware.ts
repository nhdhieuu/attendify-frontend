// src/middleware.ts
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('userToken')?.value
    const role = request.cookies.get('role')?.value
    const {pathname} = request.nextUrl

    const publicRoutes = ['/login', '/register']
    const isPublicRoute = publicRoutes.includes(pathname)

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (token && role === 'EMPLOYEE' && pathname.startsWith('/employee')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
