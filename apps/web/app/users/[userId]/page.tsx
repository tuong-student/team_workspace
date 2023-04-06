'use client'
import { Avatar, Title } from '@mantine/core'
import { ReactNode, useState } from 'react'
import { UserUser } from '../../../codegen/api'
import { $Api } from '../../../libs'

function Label({ children }: { children: ReactNode }) {
	return (
		<span className='font-bold text-[1.2rem] text-neutral-mid-90'>
			{children}
		</span>
	)
}

function Profile({ user }: { user: UserUser }) {
	return (
		<div className='flex flex-col gap-[1.6rem] py-[24px] pl-[24px] pr-[32px] border-[1px] border-neutral-mid-70'>
			<Avatar
				src={user.avatarUrl}
				size={128}
				color='blue'
				radius='xl'
			></Avatar>
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
			<div className='flex flex-col gap-[2px]'>
				<Label>Role</Label>
				<span className='text-[1.6rem] capitalize text-black'>
					{user.role}
				</span>
			</div>
			<div className='flex flex-col gap-[2px]'>
				<Label>Created At:</Label>
				<span className='text-[1.6rem] text-black'>
					{user.createdAt}
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
	const [userDetail, setUserDetail] = useState<UserUser>({})

	$Api.user.userDetailsIdGet(params.userId).then((res) => {
		if (res.status === 200) {
			setUserDetail(res.data)
		}
	})

	return (
		<div className='flex flex-col gap-[32px]'>
			<div className='flex gap-[32px] items-center'>
				<Title size={'h1'} weight={600}>
					{userDetail.fullName}
				</Title>
			</div>
			<div className='flex flex-col gap-[24px]'>
				<div className='flex gap-[32px]'>
					{userDetail && (
						<Profile user={userDetail} />
					)}
				</div>
			</div>
		</div>
	)
}
