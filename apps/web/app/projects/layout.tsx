'use client'
import HeaderLayout from '../HeaderLayout'
import SidebarLayout from '../SidebarLayout'

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
						component={<h1>Lmao</h1>}
					>
						{children}
					</SidebarLayout>
				</HeaderLayout>
			</body>
		</html>
	)
}
