import { Divider } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { AppRoute } from '../../constants'
import { uuid } from '../../utils'
import AddshortcutIcon from '../Icons/AddshortcutIcon.svg'
import BacklogIcon from '../Icons/BacklogIcon.svg'
import BoardIcon from '../Icons/BoardIcon.svg'
import CodeIcon from '../Icons/CodeIcon.svg'
import ProjectPagesIcon from '../Icons/ProjectPagesIcon.svg'
import RoadmapIcon from '../Icons/RoadmapIcon.svg'
import SettingsIcon from '../Icons/SettingsIcon.svg'
import NavLink from './NavLink'
import NavLinkLabel from './NavLinkLabel'
import NavLinkSection from './NavLinkSection'
import SidebarHeader from './SidebarHeader'

const navLinkSections: {
	label: ReactNode
	children: { label: ReactNode; icon: ReactNode; path: string }[]
}[] = [
	{
		label: 'Planning',
		children: [
			{
				label: 'Roadmap',
				icon: <RoadmapIcon />,
				path: 'roadmap'
			},
			{
				label: 'Backlog',
				icon: <BacklogIcon />,
				path: 'backlog'
			},
			{
				label: 'Board',
				icon: <BoardIcon />,
				path: 'board'
			}
		]
	},
	{
		label: 'Development',
		children: [
			{
				label: 'Code',
				icon: <CodeIcon />,
				path: '/'
			}
		]
	}
]

const otherLinks: { icon: ReactNode; label: ReactNode }[] = [
	{
		icon: <ProjectPagesIcon />,
		label: <NavLinkLabel>Project pages</NavLinkLabel>
	},
	{
		icon: <AddshortcutIcon />,
		label: <NavLinkLabel>Add shortcut</NavLinkLabel>
	},
	{
		icon: <SettingsIcon />,
		label: <NavLinkLabel>Project settings</NavLinkLabel>
	}
]

export default function MainSidebar() {
	const active = usePathname().split('/').pop()

	return (
		<>
			<div className='px-5 pt-12'>
				<SidebarHeader
					src='https://api.dicebear.com/6.x/icons/svg?seed=CheeseRaa'
					title='CheeseRaa'
					description='Software project'
				/>
			</div>
			{navLinkSections.map(({ label, children }) => (
				<NavLinkSection label={label} key={uuid()}>
					{children.map(
						({ path, label, icon }, i) => (
							<Link
								href={`${AppRoute.projects.root}/${path}`}
								key={uuid()}
							>
								<NavLink
									className='text-[rgb(66,82,110)]'
									label={
										<NavLinkLabel>
											{
												label
											}
										</NavLinkLabel>
									}
									active={
										active ===
										path
									}
									icon={
										icon
									}
								/>
							</Link>
						)
					)}
				</NavLinkSection>
			))}
			<Divider />
			{otherLinks.map((el) => (
				<NavLink
					className='text-[rgb(66,82,110)]'
					{...el}
					key={uuid()}
				/>
			))}
		</>
	)
}
