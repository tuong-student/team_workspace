'use client'
import HeaderLayout from '../HeaderLayout'
import UserSidebar from '../projects/UserSidebar'
import SidebarLayout from '../SidebarLayout'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<head>
				<title>Administrator</title>
			</head>
			<body className='flex h-screen w-screen flex-col'>
				<HeaderLayout>
					<SidebarLayout
						component={<UserSidebar />}
					>
						{children}
					</SidebarLayout>
				</HeaderLayout>
			</body>
		</html>
	)
}
