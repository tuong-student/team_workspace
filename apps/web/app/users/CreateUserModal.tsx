import { Button, NativeSelect, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useContext, useState } from 'react'
import UserContext from '../userListReducer/context'
import { addUser } from '../userListReducer/reducer'

export type CreateUserFormInputType = {
	email: string
	fullName: string
	password: string
	role: 'Administrator' | 'Developer'
}

export function CreateUserModal() {
	const initialValue: CreateUserFormInputType = {
		fullName: '',
		email: '',
		password: '',
		role: 'Developer'
	}

	const { dispatch } = useContext(UserContext)
	const [userValue, setUserValue] =
		useState<CreateUserFormInputType>(initialValue)

	const form = useForm<CreateUserFormInputType>({
		initialValues: {
			...initialValue
		},
		validate: {
			fullName: (value) =>
				value.length < 2
					? 'Name must have at least 2 letters'
					: null,
			email: (value) =>
				/^\S+@\S+$/.test(value)
					? null
					: 'Invalid email',
			password: (value) => {
				if (value.length < 6)
					return 'Password length must be longer than 5'
				if (value.length >= 20)
					return 'Password length must be lower thant 20'
			}
		},
		validateInputOnBlur: true
	})

	const handleOnChange = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLSelectElement>
	) => {
		setUserValue((previous) => ({
			...previous,
			[event.target.id]: event.target.value
		}))
	}

	const handleAddUser = (user: CreateUserFormInputType) => {
		dispatch(addUser(user))
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
					withAsterisk
					label='Full name'
					{...form.getInputProps('fullName')}
					placeholder='Full Name'
					id='name'
					size={size}
				/>
				<TextInput
					withAsterisk
					label='Email'
					{...form.getInputProps('email')}
					placeholder='Email'
					id='email'
					size={size}
				/>
				<TextInput
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
					type='submit'
					onClick={() => handleAddUser(userValue)}
					size={'xl'}
					className={'bg-primary-b400'}
				>
					Create
				</Button>
			</form>
		</div>
	)
}
