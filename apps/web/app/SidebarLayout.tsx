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
		<div className='flex flex-1 overflow-hidden flex-row items-center'>
			<aside className='h-full w-full max-w-[240px] border bg-gray-50'>
				<div className='flex flex-col gap-[10px] px-[8px]'>
					{component}
				</div>
			</aside>
			{children}
		</div>
	)
}
