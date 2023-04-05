import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AppRoute } from './constants'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken')
	const isLoginRoute = request.nextUrl.pathname !== AppRoute.login
	if (!refreshToken && isLoginRoute) {
		return NextResponse.redirect(
			new URL(AppRoute.login, request.url)
		)
	}

	const isForbiddenRoute =
		request.nextUrl.pathname === AppRoute.login ||
		request.nextUrl.pathname === AppRoute.root
	if (isForbiddenRoute && refreshToken) {
		return NextResponse.redirect(
			new URL(AppRoute.projects.root, request.url)
		)
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/projects/:path*', '/users/:path*', '/login']
}
