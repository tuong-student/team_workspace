import { Button } from '@mantine/core'
import Link from 'next/link'
import { useContext } from 'react'
import UserContext from '../userListReducer/context'
import { deleteUser } from '../userListReducer/reducer'

export default function Actions({ userId }: { userId: string }) {
	const { dispatch } = useContext(UserContext)

	const handleDeleteUser = (userId: string) => {
		dispatch(deleteUser(userId))
	}
	return (
		<div className='flex items-center justify-between'>
			<Link
				className='text-[1.3rem] font-bold text-primary-b400'
				href={`/users/${userId}`}
			>
				Show details
			</Link>
			<Button
				onClick={() => handleDeleteUser(userId)}
				className='bg-red-600 font-bold text-white'
				size={'lg'}
			>
				Delete User
			</Button>
		</div>
	)
}
