import { ReactNode } from 'react'

export type SidebarLayoutProps = {
	children: ReactNode
	component: ReactNode
}

export default function SidebarLayout({
	children,
	component
}: SidebarLayoutProps) {
	return (
		<div className='flex flex-1 flex-row items-center'>
			<aside className='h-full w-full max-w-[240px] border bg-gray-50'>
				{component}
			</aside>
			{children}
		</div>
	)
}
