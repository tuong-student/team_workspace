import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'

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
				<Avatar
					src={src}
					size={40}
					color='blue'
					placeholder='Avatar'
					radius={circle ? 'xl' : undefined}
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
