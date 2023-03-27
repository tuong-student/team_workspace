import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'

export default function SidebarHeader() {
	return (
		<div className='px-5 pt-12'>
			<UnstyledButton className='w-full px-4'>
				<Group>
					<Avatar size={40} color='blue'>
						BH
					</Avatar>
					<div className='flex-1'>
						<Text
							className='text-[rgb(66,82,110)]'
							size={22.4}
							lineClamp={1}
							weight={'bold'}
						>
							Bob Handsome
						</Text>
						<Text
							size='xl'
							color='dimmed'
							lineClamp={1}
							truncate
						>
							bob@handsome.inc
						</Text>
					</div>
				</Group>
			</UnstyledButton>
		</div>
	)
}
