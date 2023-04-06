import { ReactNode } from 'react'
import { useUserList } from '../../stores/users'
import Ammount from './Amount'
import Label from './Label'

const accountSummarizerList: { label: ReactNode; ammount: ReactNode }[] = [
	{
		label: <Label>Total users</Label>,
		ammount: <Ammount>6</Ammount>
	},
	{
		label: <Label>Active users</Label>,
		ammount: <Ammount>6</Ammount>
	},
	{
		label: <Label>Administrator</Label>,
		ammount: <Ammount>1</Ammount>
	}
]

export default function AccountSummarizer() {
	const userList = useUserList((state) => state.users)
	return (
		<div className='flex gap-[24px]'>
			<div className='flex flex-col gap-[8px]'>
				<Label>Total users:</Label>
				<Ammount>{userList.length}</Ammount>
			</div>
		</div>
	)
}
