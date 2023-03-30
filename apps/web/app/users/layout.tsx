'use client'
import { useReducer } from 'react'
import HeaderLayout from '../HeaderLayout'
import PageLayout from '../PageLayout'
import UserSidebar from '../projects/UserSidebar'
import SidebarLayout from '../SidebarLayout'
import UserContext from '../userListReducer/context'
import { userReducer } from '../userListReducer/reducer'
import { initialUserList } from '../userListReducer/state'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const [state, dispatch] = useReducer(userReducer, initialUserList)
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
						<PageLayout>
							<UserContext.Provider
								value={{
									state,
									dispatch
								}}
							>
								{children}
							</UserContext.Provider>
						</PageLayout>
					</SidebarLayout>
				</HeaderLayout>
			</body>
		</html>
	)
}
