import { ReactNode } from 'react'

export type PageLayout = {
	children: ReactNode
}

export default function PageLayout({ children }: PageLayout) {
	return (
		<div className='w-full h-full max-w-screen-lg mx-auto pt-[32px]'>
			{children}
		</div>
	)
}
