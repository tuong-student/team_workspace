'use client'
import { Button } from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { $Api } from '../../libs'
import { useNotify } from '../../stores'
import { useUserList } from '../../stores/users'
import { notifyError } from '../../utils'

export default function Actions({ userId }: { userId: number }) {
	const deleteUser = useUserList((state) => state.delete)
	const [isDeleting, setIsDeleting] = useState(false)
	const notify = useNotify()
	const handleDeleteUser = (userId: number) => {
		setIsDeleting(true)
		try {
			$Api.user
				.userDeleteIdDelete(userId as unknown as string)
				.then((res) => {
					if (res.status === 201) {
						deleteUser(userId)
					}
				})
		} catch (e) {
			notifyError(e, notify)
		} finally {
			setIsDeleting(false)
		}
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
				loading={isDeleting}
			>
				Delete User
			</Button>
		</div>
	)
}
