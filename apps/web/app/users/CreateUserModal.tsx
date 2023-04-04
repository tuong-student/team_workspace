import { Button, NativeSelect, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useContext, useState } from 'react'
import { $Api } from '../../libs'
import UserContext from '../userListReducer/context'

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

	const { dispatch } = useContext(UserContext)
	const [userValue, setUserValue] =
		useState<CreateUserFormInputType>(initialValue)
	const [isCreating, setIsCreating] = useState(false)

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
				if (value.length < 8)
					return 'Password length must be longer than 7'
				if (value.length >= 20)
					return 'Password length must be lower than 20'
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

	const handleAddUser = async (user: CreateUserFormInputType) => {
		setIsCreating(!isCreating)
		let newUser = await $Api.user.userCreatePost(user)
		console.log(newUser.statusText)
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
					data={['user']}
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
