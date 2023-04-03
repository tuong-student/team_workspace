import { CreateUserFormInputType } from '../users/CreateUserModal'
import { ActionType, AddUser, DeleteUser, UserListActions } from './actions'
import { UserListState } from './state'

export function userReducer(
	state: UserListState,
	action: UserListActions
): UserListState {
	switch (action.type) {
		case ActionType.AddUser:
			return {
				...state,
				users: [...state.users]
			}
		case ActionType.DeleteUser:
			const userList = [...state.users]
			const newList = userList.filter(
				(user) => user.id !== action.payload
			)

			return {
				users: newList
			}

		default:
			return state
	}
}

export const addUser = (user: CreateUserFormInputType): AddUser => ({
	type: ActionType.AddUser,
	payload: user
})

export const deleteUser = (userId: string): DeleteUser => ({
	type: ActionType.DeleteUser,
	payload: userId
})
