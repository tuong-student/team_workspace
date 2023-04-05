'use client'
import { Table } from '@mantine/core'
import { ReactNode } from 'react'
import { useUserList } from '../../stores/users'
import Actions from './ActionGroup'
import User from './User'

export type UserDataType = {
	id: string
	avatarUrl?: string
	fullName: string
	email: string
	role: string
	createAt: string
	updateAt: string
}

const TableLabel = ({ children }: { children: ReactNode }) => {
	return (
		<span className='text-[1rem] text-neutral-mid-90'>
			{children}
		</span>
	)
}

export default function UsersTable() {
	const userList = useUserList((state) => state.users)

	const userDataRows = userList.map((user, i) => (
		<tr key={i}>
			<td>
				<User user={user} />
			</td>
			<td>
				<span className='text-[1.3rem]'>
					{user.createAt}
				</span>
			</td>
			<td>
				<Actions userId={user.id} />
			</td>
		</tr>
	))
	return (
		<Table>
			<thead>
				<tr>
					<th>
						<TableLabel>User</TableLabel>
					</th>
					<th>
						<TableLabel>
							Create At
						</TableLabel>
					</th>
					<th>
						<TableLabel>Actions</TableLabel>
					</th>
				</tr>
			</thead>
			<tbody>{userDataRows}</tbody>
		</Table>
	)
}
