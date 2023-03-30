import { Avatar } from '@mantine/core'
import { ReactNode } from 'react'

export type ProjectDetailProps = {
	id: string
	photo?: string
	name: string
	users: string[]
}

export const Name = ({ children }: { children: ReactNode }) => {
	return (
		<span className='text-[1.4rem] text-neutral-900'>
			{children}
		</span>
	)
}

export default function Project({ project }: { project: ProjectDetailProps }) {
	return (
		<div className='flex items-center gap-[8px]'>
			<Avatar src={project.photo} color={'blue'} size={'lg'}>
				{project.photo ? '' : 'JR'}
			</Avatar>
			<div className='flex flex-col'>
				<Name>{project.name}</Name>
			</div>
		</div>
	)
}
