'use client'
import { ReactNode } from 'react'
import HeaderLayout from '../../layouts/HeaderLayout'

export default function AppLayout({ children }: { children: ReactNode }) {
	return <HeaderLayout>{children}</HeaderLayout>
}
