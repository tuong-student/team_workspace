import { Button, Input, NativeSelect, Title } from '@mantine/core'
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
			<form action='' className='flex flex-col gap-[16px]'>
				<Input.Wrapper
					withAsterisk
					label='Full Name'
					size={size}
				>
					<Input
						value={userValue.fullName}
						onChange={handleOnChange}
						placeholder='Full Name'
						id='name'
						size={size}
					/>
				</Input.Wrapper>
				<Input.Wrapper
					withAsterisk
					label='Email'
					size={size}
				>
					<Input
						value={userValue.email}
						onChange={handleOnChange}
						placeholder='Email'
						id='email'
						size={size}
					/>
				</Input.Wrapper>
				<Input.Wrapper
					withAsterisk
					label='Password'
					size={size}
				>
					<Input
						value={userValue.email}
						onChange={handleOnChange}
						placeholder='password'
						id='password'
						size={size}
					/>
				</Input.Wrapper>
				<NativeSelect
					id='role'
					value={userValue.role}
					data={['Developer', 'Administrator']}
					size={'xl'}
					onChange={handleOnChange}
				/>
				<Button
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
