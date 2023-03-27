import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
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
			{userSidebarLinks.map((el, i) => (
				<Link href={`/users/${el.path}`} key={i}>
					<NavLink
						className='text-[rgb(66,82,110)]'
						active={
							el.path === active ||
							`/users/${el.path}` ===
								pathname + '/'
						}
						{...el}
					/>
				</Link>
			))}
		</div>
	)
}
