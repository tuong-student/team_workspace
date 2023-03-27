import { NavLink as MantineNavLink, NavLinkProps } from '@mantine/core'

export default function NavLink(
	props: NavLinkProps & {
		onClick?: React.MouseEventHandler
	}
) {
	return (
		<MantineNavLink
			{...props}
			className={`hover:bg-blue-100 ${props.className}`}
		/>
	)
}
