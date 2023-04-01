import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken')
	if (!refreshToken) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (request.nextUrl.pathname === '/login' && refreshToken) {
		return NextResponse.redirect(new URL('/projects', request.url))
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/projects/:path*', '/users/:path*', '/login']
}
