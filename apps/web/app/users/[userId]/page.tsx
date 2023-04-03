'use client'
import { Avatar, Title } from '@mantine/core'
import { ReactNode, useContext } from 'react'
import UserContext from '../../userListReducer/context'
import { UserDataType } from '../UsersTable'
import { ProjectDetailProps } from './Project'
import ProjectsTable from './ProjectsTable'

export const projectList: ProjectDetailProps[] = [
	{
		id: 'allforone',
		name: 'All for one',
		users: ['dat', 'duong']
	},
	{
		id: 'oneforall',
		name: 'One for all',
		users: ['duong']
	}
]

export function Label({ children }: { children: ReactNode }) {
	return (
		<span className='font-bold text-[1.2rem] text-neutral-mid-90'>
			{children}
		</span>
	)
}

export function Profile({ user }: { user: UserDataType }) {
	return (
		<div className='flex flex-col gap-[1.6rem] py-[24px] pl-[24px] pr-[32px] border-[1px] border-neutral-mid-70'>
			<Avatar
				src={user.avatarUrl}
				size={128}
				color='blue'
				radius='xl'
			>
				US
			</Avatar>
			<div className='flex flex-col gap-[2px]'>
				<Label>Full Name</Label>
				<span className='text-[1.6rem] text-black'>
					{user.fullName}
				</span>
			</div>
			<div className='flex flex-col gap-[2px]'>
				<Label>Email address</Label>
				<span className='text-[1.6rem] text-black'>
					{user.email}
				</span>
			</div>
		</div>
	)
}

export default function UserDetailPage({
	params
}: {
	params: { userId: string }
}) {
	const { state } = useContext(UserContext)

	const user = state.users.find((user) => user.id === params.userId)
	const userProject = projectList.filter((project) =>
		project.users.includes(params.userId)
	)
	return (
		<div className='flex flex-col gap-[32px]'>
			<Title size={'h1'} weight={600}>
				{user?.fullName}
			</Title>
			<div className='flex flex-col gap-[24px]'>
				<div className='flex gap-[32px]'>
					{user && <Profile user={user} />}
					<div className='flex-1'>
						<ProjectsTable
							data={userProject}
							userRole={'Developer'}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
