'use client'
import { ActionIcon, NavLink, Popover } from '@mantine/core'
import EllipsisIcon from '../../../../Icons/EllipsisIcon.svg'

export default function DetailsPage({ params }: { params: { id: number } }) {
	return (
		<main className='h-full w-full p-[40px]'>
			<div className='h-full w-full text-[rgb(23,43,77)] max-w-[976px] m-auto'>
				<header className='flex flex-row items-center justify-between'>
					<h1 className='text-[24px] font-medium'>
						Details
					</h1>
					<Popover position='bottom-end'>
						<Popover.Target>
							<ActionIcon
								size={'xl'}
								variant='subtle'
							>
								<EllipsisIcon />
							</ActionIcon>
						</Popover.Target>

						<Popover.Dropdown className='px-0'>
							<NavLink
								className='px-[16px] py-[8px]'
								label={
									<span className='text-[14px] text-[rgb(23,43,77)]'>
										Move
										to
										trash
									</span>
								}
							/>
						</Popover.Dropdown>
					</Popover>
				</header>
			</div>
		</main>
	)
}
