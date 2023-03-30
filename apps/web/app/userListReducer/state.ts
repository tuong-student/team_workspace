import { UserDataType } from '../users/UsersTable'

export interface UserListState {
	users: UserDataType[]
}

export const initialUserList: UserListState = {
	users: [
		{
			id: 'dat',
			detail: {
				name: 'Huynh Cong Dat',
				username: 'congdat@student.hcmute.edu.vn'
			},
			activeDate: 'Mar 25, 2023',
			status: 'active'
		},
		{
			id: 'duy',
			detail: {
				name: 'Nguyen Khang Duy',
				username: 'khangduy@student.hcmute.edu.vn'
			},
			activeDate: 'Mar 25, 2023',
			status: 'active'
		},
		{
			id: 'duong',
			detail: {
				name: 'Le Ho Hai Duong',
				username: 'haiduong@student.hcmute.edu.vn'
			},
			activeDate: 'Mar 25, 2023',
			status: 'active'
		}
	]
}
