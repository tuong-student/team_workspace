import { Divider } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
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
			<SidebarHeader />
			{navLinkSections.map(({ label, children }, i) => (
				<NavLinkSection label={label} key={i}>
					{children.map(
						({ path, label, icon }, i) => (
							<Link
								href={`/projects/${path}`}
								key={i}
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
			{otherLinks.map((el, i) => (
				<NavLink
					className='text-[rgb(66,82,110)]'
					{...el}
					key={i}
				/>
			))}
		</>
	)
}
