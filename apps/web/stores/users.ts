import { CreateUserFormInputType } from '../app/users/CreateUserModal'
import { UserDataType } from '../app/users/UsersTable'

export type UserListState = {
	users: UserDataType[]
	create: (user: CreateUserFormInputType) => void
	remove: (userId: string) => void
}
