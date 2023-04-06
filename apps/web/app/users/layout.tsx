'use client'
import HeaderLayout from '../HeaderLayout'
import PageLayout from '../PageLayout'
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
			<body className='flex overflow-hidden h-screen w-screen flex-col'>
				<HeaderLayout>
					<SidebarLayout
						component={<UserSidebar />}
					>
						<div className='w-full h-full overflow-scroll'>
							<PageLayout>
								{children}
							</PageLayout>
						</div>
					</SidebarLayout>
				</HeaderLayout>
			</body>
		</html>
	)
}
