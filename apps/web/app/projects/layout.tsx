'use client'
import { usePathname } from 'next/navigation'
import HeaderLayout from '../HeaderLayout'
import SidebarLayout from '../SidebarLayout'
import MainSidebar from './MainSidebar'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname().split('/')
	const Children =
		pathname.length === 2 ? (
			<>{children}</>
		) : (
			<SidebarLayout component={<MainSidebar />}>
				{children}
			</SidebarLayout>
		)
	return (
		<html lang='en'>
			<head>
				<title>Projects</title>
			</head>
			<body className='flex h-screen w-screen flex-col'>
				<HeaderLayout>{Children}</HeaderLayout>
			</body>
		</html>
	)
}
