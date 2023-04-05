import { Avatar } from '@mantine/core'
import { ReactNode } from 'react'
import { UserUser } from '../../codegen/api'

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

export default function User({ user }: { user: UserUser }) {
	return (
		<div className='flex items-center gap-[8px]'>
			<Avatar
				src={user.avatarUrl}
				color={'blue'}
				size={'lg'}
				radius='xl'
			></Avatar>
			<div className='flex flex-col'>
				<Name>{user.fullName}</Name>
				<UserName>{user.email}</UserName>
			</div>
		</div>
	)
}
