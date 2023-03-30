import { ReactNode, useState } from 'react'
import CaretDownIcon from '../Icons/CaretDownIcon.svg'
import NavLink from './NavLink'

export type NavLinkSectionProps = {
	label: ReactNode
	children: ReactNode
}

export default function NavLinkSection({
	children,
	label
}: NavLinkSectionProps) {
	const [opened, setOpen] = useState(true)
	const handleCollapse = () => {
		setOpen(!opened)
	}
	return (
		<div>
			<NavLink
				className='group text-[rgb(66,82,110)]'
				childrenOffset={0}
				label={
					<span className='font-bold text-[11px]'>
						{label}
					</span>
				}
				icon={
					<CaretDownIcon
						className={`${
							opened
								? ''
								: '-rotate-90'
						} ${
							opened
								? 'opacity-0 group-hover:opacity-100'
								: ''
						}`}
					/>
				}
				opened={opened}
				onClick={handleCollapse}
				rightSection={<></>}
				disableRightSectionRotation
			>
				{children}
			</NavLink>
		</div>
	)
}
