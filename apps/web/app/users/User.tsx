import { Avatar } from '@mantine/core'
import { ReactNode } from 'react'

export type UserDetailProps = {
	photo?: string
	name: string
	username: string
}

export const Name = ({ children }: { children: ReactNode }) => {
	return (
		<span className='text-[1.4rem] text-neutral-900'>
			{children}
		</span>
	)
}
export const UserName = ({ children }: { children: ReactNode }) => {
	return (
		<span className='text-[1.2rem] text-neutral-mid-300'>
			{children}
		</span>
	)
}

export default function User({ user }: { user: UserDetailProps }) {
	return (
		<div className='flex items-center gap-[8px]'>
			<Avatar
				src={user.photo}
				color={'blue'}
				size={'lg'}
				radius='xl'
			>
				{user.photo ? '' : 'US'}
			</Avatar>
			<div className='flex flex-col'>
				<Name>{user.name}</Name>
				<UserName>{user.username}</UserName>
			</div>
		</div>
	)
}
