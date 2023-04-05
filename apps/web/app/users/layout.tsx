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
			<body className='flex overflow-hidden h-screen w-screen flex-col'>
				<HeaderLayout>
					<SidebarLayout
						component={<UserSidebar />}
					>
						<div className='w-full h-full overflow-scroll'>
							<PageLayout>
								<UserContext.Provider
									value={{
										state,
										dispatch
									}}
								>
									{
										children
									}
								</UserContext.Provider>
							</PageLayout>
						</div>
					</SidebarLayout>
				</HeaderLayout>
			</body>
		</html>
	)
}
