import { Button, Input, Title } from '@mantine/core'
import { useContext, useState } from 'react'
import UserContext from '../userListReducer/context'
import { addUser } from '../userListReducer/reducer'
import { UserDetailProps } from './User'
import { UserDataType } from './UsersTable'

export function CreateUserModal() {
	const initialValue: UserDetailProps = {
		name: '',
		username: ''
	}

	const { dispatch } = useContext(UserContext)
	const [userValue, setUserValue] =
		useState<UserDetailProps>(initialValue)

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUserValue((previous) => ({
			...previous,
			[event.target.id]: event.target.value
		}))
	}

	const handleAddUser = (userDetail: UserDetailProps) => {
		const user: UserDataType = {
			id: new Date().toDateString(),
			activeDate: new Date().toDateString(),
			detail: { ...userDetail }
		}
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
						value={userValue.name}
						onChange={handleOnChange}
						placeholder='Full Name'
						id='name'
						size={size}
					/>
				</Input.Wrapper>
				<Input.Wrapper
					withAsterisk
					label='Username'
					size={size}
				>
					<Input
						value={userValue.username}
						onChange={handleOnChange}
						placeholder='Username'
						id='username'
						size={size}
					/>
				</Input.Wrapper>
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
