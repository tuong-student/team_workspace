import { ReactNode } from 'react'
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
	return (
		<div className='flex gap-[24px]'>
			{accountSummarizerList.map((item, i) => (
				<div
					key={i}
					className='flex flex-col gap-[8px]'
				>
					{item.label}
					{item.ammount}
				</div>
			))}
		</div>
	)
}
