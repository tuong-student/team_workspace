'use client'

import { Button, Modal, Text, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useContext } from 'react'
import SearchIcon from '../Icons/SearchIcon.svg'
import UserContext from '../userListReducer/context'
import AccountSummarizer from './AccountSummarizer'
import { CreateUserModal } from './CreateUserModal'
import UsersTable from './UsersTable'

export default function UsersManagementPage() {
	const { state } = useContext(UserContext)
	const usersList = [...state.users]
	const [opened, { open, close }] = useDisclosure(false)
	return (
		<div className='flex flex-col gap-[28px]'>
			<div className='flex flex-col gap-[16px]'>
				<div className='flex w-full justify-between items-center'>
					<Title size={'h1'} weight={600}>
						Users
					</Title>
					<Button
						onClick={open}
						className='h-[3.2rem] bg-primary-b400 px-[10px]'
						size='xl'
					>
						Create User
					</Button>
				</div>
				<Text fz={'xl'}>
					Manage product access for all the users
					in your organisation
				</Text>
			</div>
			<AccountSummarizer />
			<div className='flex gap-[8px]'>
				<div className='w-[280px]'>
					<TextInput
						rightSection={<SearchIcon />}
						size={'xl'}
						radius={'sm'}
						placeholder='Enter name or email address'
					></TextInput>
				</div>
				<Button
					className='bg-neutral-light-30 text-neutral-800 text-[1.4rem] font-bold'
					size={'xl'}
				>
					Filters
				</Button>
			</div>
			<UsersTable userList={usersList} />
			<Modal
				size={'xl'}
				opened={opened}
				onClose={close}
				withCloseButton={false}
			>
				<CreateUserModal />
			</Modal>
		</div>
	)
}
