import { ReactNode } from 'react'

export type NavLinkLabelProps = {
	children: ReactNode
}

export default function NavLinkLabel({ children }: NavLinkLabelProps) {
	return <span className='text-[14px] font-normal'>{children}</span>
}
