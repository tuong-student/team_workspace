import { create } from 'zustand'
import { UserUser } from '../codegen/api'

export type UserListState = {
	users: UserUser[]
	create: (user: UserUser) => void
	getList: (users: UserUser[]) => void
}
export const useUserList = create<UserListState>((set) => ({
	users: [],
	create: (user) => set((state) => ({ users: [...state.users, user] })),
	getList: (userList) => set((state) => ({ users: [...userList] }))
}))
