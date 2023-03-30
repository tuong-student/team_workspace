import { UserDataType } from '../users/UsersTable'
export enum ActionType {
	AddUser,
	DeleteUser,
	GetUser
}

export interface AddUser {
	type: ActionType.AddUser
	payload: UserDataType
}

export interface DeleteUser {
	type: ActionType.DeleteUser
	payload: string
}

export interface GetUser {
	type: ActionType.GetUser
	payload: UserDataType
}
export type UserListActions = AddUser | DeleteUser | GetUser
