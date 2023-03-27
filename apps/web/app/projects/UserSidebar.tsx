import Link from 'next/link'
import { ReactNode } from 'react'
import NavLink from './NavLink'
import NavLinkLabel from './NavLinkLabel'

const userSidebarLinks: { label: ReactNode; path: string }[] = [
	{
		label: <NavLinkLabel>Users</NavLinkLabel>,
		path: '/users'
	},
	{
		label: <NavLinkLabel>Groups</NavLinkLabel>,
		path: '/users/groups'
	},
	{
		label: <NavLinkLabel>Managed accounts</NavLinkLabel>,
		path: '/users/accounts'
	}
]

export default function UserSidebar() {
	return (
		<div className='pt-[16px]'>
			{userSidebarLinks.map((el, i) => (
				<Link href={el.path} key={i}>
					<NavLink
						className='text-[rgb(66,82,110)]'
						{...el}
					/>
				</Link>
			))}
		</div>
	)
}
