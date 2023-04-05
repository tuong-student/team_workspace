'use client'

import { Button, Modal, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AccountManager from './AccountManager'
import { CreateUserModal } from './CreateUserModal'

export default function UsersManagementPage() {
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
			<AccountManager />
			<Modal
				zIndex={2}
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
