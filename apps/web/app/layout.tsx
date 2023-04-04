/* 'use client'
import './global.css'
import NotificationList from './NotificationList'
import Providers from './Providers'

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <head>
                <title>Jira</title>
            </head>
            <body className='flex h-screen w-screen flex-col'>
                <NotificationList />
                <Providers>{children}</Providers>
            </body>
        </html>
    )
} */

import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<title>Jira</title>
			</head>
			<body className='flex h-screen w-screen flex-col'>
				{children}
			</body>
		</html>
	)
}
