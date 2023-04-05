'use client'
import { ReactNode } from 'react'
import SidebarLayout from '../../../../SidebarLayout'

export default function DynamicProjectLayout({
	children
}: {
	children: ReactNode
}) {
	return (
		<SidebarLayout component={<div>Lmao</div>}>
			{children}
		</SidebarLayout>
	)
}
