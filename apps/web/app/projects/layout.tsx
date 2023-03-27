'use client'
import HeaderLayout from '../HeaderLayout'
import SidebarLayout from '../SidebarLayout'
import MainSidebar from './MainSidebar'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<head>
				<title>Projects</title>
			</head>
			<body className='flex h-screen w-screen flex-col'>
				<HeaderLayout>
					<SidebarLayout
						component={<MainSidebar />}
					>
						{children}
					</SidebarLayout>
				</HeaderLayout>
			</body>
		</html>
	)
}
