import { Group, Text, UnstyledButton } from '@mantine/core'
import Image from 'next/image'

type SidebarHeaderProps = {
	src: string
	title: string
	description: string
	circle?: boolean
}

export default function SidebarHeader({
	description,
	title,
	src,
	circle
}: SidebarHeaderProps) {
	return (
		<UnstyledButton className='w-full px-4 cursor-default'>
			<Group>
				<Image
					alt='Project icon'
					className={`${
						circle
							? 'rounded-full'
							: 'rounded'
					}`}
					src={src}
					width={40}
					height={40}
					color='blue'
				/>
				<div className='flex-1'>
					<Text
						className='text-[rgb(66,82,110)]'
						size={22.4}
						lineClamp={1}
						weight={'bold'}
					>
						{title}
					</Text>
					<Text
						size='xl'
						color='dimmed'
						lineClamp={1}
						truncate
					>
						{description}
					</Text>
				</div>
			</Group>
		</UnstyledButton>
	)
}
