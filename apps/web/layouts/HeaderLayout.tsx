import NextLink from 'next/link'
import {
	ActionIcon,
	Avatar,
	Button,
	ButtonProps,
	TextInput
} from '@mantine/core'
import SearchIcon from './SearchIcon'
import JiraLogo from './JiraLogo'
import GridIcon from './GridIcon'
import CaretDownIcon from './CaretDownIcon'
import BellIcon from './BellIcon'
import HelpIcon from './HelpIcon'
import SettingsIcon from './SettingsIcon'
import { ReactNode } from 'react'

const ButtonTexts: { children: ReactNode; props?: ButtonProps }[] = [
	{ children: 'Your work', props: {} },
	{ children: 'Projects', props: {} },
	{ children: 'Filters', props: {} },
	{ children: 'Dashboard', props: {} },
	{ children: 'Teams', props: {} },
	{ children: 'Apps', props: {} }
]

const icons = [BellIcon, HelpIcon, SettingsIcon]

export default function HeaderLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex h-screen w-screen flex-col'>
			<header className='flex h-[5.6rem] flex-row items-center px-[1.2rem]'>
				<nav className='flex h-full flex-row items-center'>
					<ActionIcon
						variant='subtle'
						className='group rounded-full'
						color={'indigo'}
						size={54}
					>
						<GridIcon />
					</ActionIcon>
					<NextLink href='/'>
						<Button
							className='h-[3.4rem]'
							variant='subtle'
						>
							<JiraLogo />
						</Button>
					</NextLink>
					<div className='flex flex-row items-center'>
						{ButtonTexts.map(
							({
								children,
								props
							}) => (
								<Button
									className='group mx-[4px] h-[3.4rem] pl-[4px] pr-0'
									color={
										'indigo'
									}
									variant={
										'subtle'
									}
									size='xl'
									{...props}
									key={crypto.randomUUID()}
								>
									<span className='text-slate-500 group-hover:text-blue-500'>
										{
											children
										}
									</span>
									<span className='text-slate-500/60 group-hover:text-blue-500/60'>
										<CaretDownIcon />
									</span>
								</Button>
							)
						)}
						<div>
							<Button
								className='ml-[12px] h-[3.2rem] bg-blue-600 px-[10px]'
								size='xl'
							>
								Create
							</Button>
						</div>
					</div>
				</nav>
				<div className='h-full flex-1' />
				<div className='flex h-full flex-row items-center gap-[4px]'>
					<TextInput
						icon={<SearchIcon />}
						size='lg'
						radius={'md'}
					/>
					{icons.map((Icon) => (
						<ActionIcon
							variant='subtle'
							className='group rounded-full'
							color={'indigo'}
							size={54}
							key={crypto.randomUUID()}
						>
							<span className='text-zinc-500 group-hover:text-blue-500'>
								{<Icon />}
							</span>
						</ActionIcon>
					))}
					<ActionIcon
						variant='subtle'
						className='rounded-full'
						color={'indigo'}
						size={54}
					>
						<Avatar
							color={'indigo'}
							className='flex items-center'
							radius='xl'
						>
							MK
						</Avatar>
					</ActionIcon>
				</div>
			</header>
			{children}
		</div>
	)
}
