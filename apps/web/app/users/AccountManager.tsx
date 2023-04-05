'use client'
import { Button, TextInput } from '@mantine/core'
import { $Api } from '../../libs'
import { useNotification } from '../../stores'
import { useUserList } from '../../stores/users'
import { notifyError } from '../../utils'
import SearchIcon from '../Icons/SearchIcon.svg'
import AccountSummarizer from './AccountSummarizer'
import UsersTable from './UsersTable'

export function SearchBar() {
	return (
		<div className='flex gap-[8px]'>
			<div className='w-[280px]'>
				<TextInput
					rightSection={<SearchIcon />}
					size={'xl'}
					radius={'sm'}
					placeholder='Enter name or email address'
				></TextInput>
			</div>
			<Button
				className='bg-neutral-light-30 text-neutral-800 text-[1.4rem] font-bold'
				size={'xl'}
			>
				Filters
			</Button>
		</div>
	)
}
export default function AccountManager() {
	const notify = useNotification((s) => s.notify)

	const getUserList = useUserList((state) => state.getList)
	try {
		$Api.user.userFindGet().then((res) => {
			if (res.status === 200) {
				res.data.items
					? getUserList(res.data.items)
					: undefined
			}
		})
	} catch (e) {
		notifyError(e, notify)
	}

	return (
		<div className='flex w-full flex-col gap-[32px]'>
			<AccountSummarizer />
			<SearchBar />
			<UsersTable />
		</div>
	)
}
