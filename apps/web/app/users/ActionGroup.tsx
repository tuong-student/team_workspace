import { Button } from '@mantine/core'
import Link from 'next/link'

export default function Actions({ userId }: { userId: number | undefined }) {
	const handleDeleteUser = (userId: string) => {}
	return (
		<div className='flex items-center justify-between'>
			<Link
				className='text-[1.3rem] font-bold text-primary-b400'
				href={`/users/${userId}`}
			>
				Show details
			</Link>
			<Button
				className='bg-red-600 font-bold text-white'
				size={'lg'}
			>
				Delete User
			</Button>
		</div>
	)
}
