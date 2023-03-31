'use client'
import { ActionIcon, NavLink, Popover } from '@mantine/core'
import EllipseIcon from '../Icons/EllipsisIcon.svg'

const labels = ['Project settings', 'Move to trash']

export default function ActionContent() {
	return (
		<Popover position='bottom-end'>
			<Popover.Target>
				<ActionIcon size={'xl'} variant='transparent'>
					<EllipseIcon />
				</ActionIcon>
			</Popover.Target>

			<Popover.Dropdown className='px-0'>
				<div>
					{labels.map((label) => (
						<NavLink
							key={label}
							className='px-[16px] py-[8px]'
							label={
								<span className='text-[14px] text-[rgb(23,43,77)]'>
									{label}
								</span>
							}
						/>
					))}
				</div>
			</Popover.Dropdown>
		</Popover>
	)
}
