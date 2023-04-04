import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AppRoute } from './constants'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken')
	if (!refreshToken && request.nextUrl.pathname !== AppRoute.login) {
		return NextResponse.redirect(
			new URL(AppRoute.login, request.url)
		)
	}

	if (request.nextUrl.pathname === AppRoute.login && refreshToken) {
		return NextResponse.redirect(
			new URL(AppRoute.projects.root, request.url)
		)
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/projects/:path*', '/users/:path*', '/login']
}
