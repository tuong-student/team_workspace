import { UserDataType } from '../users/UsersTable'

export interface UserListState {
	users: UserDataType[]
}

export const initialUserList: UserListState = {
	users: [
		{
			id: 'dat',
			fullName: 'Huynh Cong Dat',
			email: 'congdat@student.hcmute.edu.vn',
			createAt: 'Mar 25, 2023',
			role: 'Developer'
		},
		{
			id: 'duy',
			fullName: 'Nguyen Khang Duy',
			email: 'khangduy@student.hcmute.edu.vn',
			createAt: 'Mar 25, 2023',
			role: 'Developer'
		},
		{
			id: 'duong',
			fullName: 'Le Ho Hai Duong',
			email: 'haiduong@student.hcmute.edu.vn',
			createAt: 'Mar 25, 2023',
			role: 'Developer'
		}
	]
}
