import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { AppRoute } from '../../constants'
import { uuid } from '../../utils'
import NavLink from './NavLink'
import NavLinkLabel from './NavLinkLabel'

const userSidebarLinks: { label: ReactNode; path: string }[] = [
	{
		label: <NavLinkLabel>Users</NavLinkLabel>,
		path: ''
	},
	{
		label: <NavLinkLabel>Groups</NavLinkLabel>,
		path: 'groups'
	},
	{
		label: <NavLinkLabel>Managed accounts</NavLinkLabel>,
		path: 'accounts'
	}
]

export default function UserSidebar() {
	const pathname = usePathname()
	const active = pathname.split('/').pop()

	return (
		<div className='pt-[16px]'>
			{userSidebarLinks.map((el) => (
				<Link
					href={`${AppRoute.users.root}/${el.path}`}
					key={uuid()}
				>
					<NavLink
						className='text-[rgb(66,82,110)]'
						active={
							el.path === active ||
							`${AppRoute.users.root}/${el.path}` ===
								pathname + '/'
						}
						{...el}
					/>
				</Link>
			))}
		</div>
	)
}
