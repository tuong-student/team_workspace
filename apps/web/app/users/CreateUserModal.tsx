import { Button, NativeSelect, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { $Api } from '../../libs'
import { useNotification } from '../../stores'
import { useUserList } from '../../stores/users'
import { notifyError, notifySuccess } from '../../utils'

export type CreateUserFormInputType = {
	email: string
	fullName: string
	password: string
	role: string
}

export function CreateUserModal() {
	const initialValue: CreateUserFormInputType = {
		fullName: '',
		email: '',
		password: '',
		role: 'user'
	}
	const [isCreating, setIsCreating] = useState(false)
	const notify = useNotification((s) => s.notify)
	const form = useForm<CreateUserFormInputType>({
		initialValues: {
			...initialValue
		},
		validate: {
			fullName: (value) =>
				value.length < 8
					? 'Full name must have at least 8 letters'
					: null,
			email: (value) =>
				/^\S+@\S+$/.test(value)
					? null
					: 'Invalid email',
			password: (value) => {
				if (value.length < 8)
					return 'Password must have at least 8 letters'
			}
		},
		validateInputOnBlur: true
	})

	const addUser = useUserList((state) => state.create)
	const handleAddUser = async (user: CreateUserFormInputType) => {
		setIsCreating(true)
		if (form.errors && Object.keys(form.errors).length === 0) {
			try {
				await $Api.user
					.userCreatePost(user)
					.then((res) => {
						if (res.status === 201)
							notifySuccess(
								'Create User Succesfully',
								notify
							)
						addUser(res.data)
					})
			} catch (e) {
				notifyError(e, notify)
			}
		}
		setIsCreating(false)
	}

	const size = 'xl'

	return (
		<div className='flex flex-col gap-[24px] bg-white px-[24px] pb-[32px] pt-[24px]'>
			<Title size={'h1'}>Create new user</Title>
			<form
				action=''
				onSubmit={form.onSubmit(handleAddUser)}
				className='flex flex-col gap-[16px]'
			>
				<TextInput
					maxLength={30}
					withAsterisk
					label='Full name'
					{...form.getInputProps('fullName')}
					placeholder='Full Name'
					id='name'
					size={size}
				/>
				<TextInput
					maxLength={30}
					withAsterisk
					label='Email'
					{...form.getInputProps('email')}
					placeholder='Email'
					id='email'
					size={size}
				/>
				<TextInput
					maxLength={32}
					{...form.getInputProps('password')}
					withAsterisk
					type='password'
					label='Password'
					placeholder='Password'
					id='password'
					size={size}
				/>
				<NativeSelect
					id='role'
					{...form.getInputProps('role')}
					data={['Developer', 'Administrator']}
					size={'xl'}
				/>
				<Button
					loading={isCreating}
					type='submit'
					size={'xl'}
					className={'bg-primary-b400'}
				>
					Create
				</Button>
			</form>
		</div>
	)
}
