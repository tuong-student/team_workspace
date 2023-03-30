import { NativeSelect, Table } from '@mantine/core'
import { ReactNode } from 'react'
import Project, { ProjectDetailProps } from './Project'

export const TableLabel = ({ children }: { children: ReactNode }) => {
	return (
		<span className='text-[1rem] text-neutral-mid-90'>
			{children}
		</span>
	)
}

export default function ProjectsTable({
	data,
	userRole = 'Developer'
}: {
	data: ProjectDetailProps[]
	userRole: 'Administrator' | 'Developer' | undefined
}) {
	const projectDataRows = data.map((project, i) => (
		<tr key={i}>
			<td>
				<Project project={project} />
			</td>
			<td>
				<span className='text-[1.3rem]'>
					Mar 25, 2023
				</span>
			</td>
			<td>
				<NativeSelect
					value={userRole}
					data={['Developer', 'Administrator']}
					size={'xl'}
				/>
			</td>
		</tr>
	))
	return (
		<Table>
			<thead>
				<tr>
					<th>
						<TableLabel>Project</TableLabel>
					</th>
					<th>
						<TableLabel>
							Last Active
						</TableLabel>
					</th>
					<th>
						<TableLabel>Role</TableLabel>
					</th>
				</tr>
			</thead>
			<tbody>{projectDataRows}</tbody>
		</Table>
	)
}
