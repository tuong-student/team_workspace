import {
	ActionIcon,
	Avatar,
	Button,
	ButtonProps,
	Divider,
	NavLink,
	Popover,
	TextInput
} from '@mantine/core'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { AppRoute } from '../constants'
import { useUserProfile } from '../hooks/useUserProfile'
import { deleteTokens, uuid } from '../utils'
import ArrowUpRightFromSquareIcon from './Icons/ArrowUpRightFromSquareIcon.svg'
import BellIcon from './Icons/BellIcon.svg'
import CaretDownIcon from './Icons/CaretDownIcon.svg'
import GridIcon from './Icons/GridIcon.svg'
import HelpIcon from './Icons/HelpIcon.svg'
import JiraLogo from './Icons/JiraLogo.svg'
import SearchIcon from './Icons/SearchIcon.svg'
import SettingsIcon from './Icons/SettingsIcon.svg'
import SidebarHeader from './projects/SidebarHeader'

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
	const router = useRouter()
	const { data: profileData } = useUserProfile()

	function handleLogout() {
		deleteTokens()
		router.push(AppRoute.login)
	}

	return (
		<>
			<header className='flex h-[5.6rem] flex-row items-center px-[1.2rem] shadow-lg'>
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
							<JiraLogo height='24' />
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
									key={uuid()}
								>
									<span
										className='text-slate-500 group-hover:text-blue-500'
										key={uuid()}
									>
										{
											children
										}
									</span>
									<span
										className='text-slate-500/60 group-hover:text-blue-500/60'
										key={uuid()}
									>
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
							key={uuid()}
						>
							<span className='text-zinc-500 group-hover:text-blue-500'>
								{<Icon />}
							</span>
						</ActionIcon>
					))}
					<Popover
						width={'13%'}
						position='bottom-end'
					>
						<Popover.Target>
							<ActionIcon
								variant='subtle'
								className='rounded-full'
								color={'indigo'}
								size={54}
							>
								<Avatar
									color={
										'indigo'
									}
									className='flex items-center'
									radius='xl'
									src={
										profileData?.avatarUrl
									}
								/>
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown
							className='pb-[8px]'
							classNames={{
								dropdown: 'text-[rgb(23,43,77)]'
							}}
						>
							<div className='flex flex-col gap-[8px] pt-[14px]'>
								<p className='pl-[6px] text-[rgb(94,108,132)] text-[11px] uppercase font-bold select-none'>
									Account
								</p>
								<div className='py-[8px]'>
									<SidebarHeader
										src={
											profileData?.avatarUrl ||
											''
										}
										title={
											profileData?.fullName ||
											'User Name'
										}
										description={
											profileData?.email ||
											'User email'
										}
										circle
									/>
								</div>
							</div>
							<NavLink
								className='py-[10px] text-[rgb(23,43,77)]'
								label={
									<span className='text-[14px]'>
										Manage
										account
									</span>
								}
								rightSection={
									<ArrowUpRightFromSquareIcon width='16' />
								}
							/>
							<Divider my='lg' />
							<div className=''>
								<p className='pl-[6px] text-[rgb(94,108,132)] text-[11px] uppercase font-bold mt-[14px] mb-[6px] select-none'>
									Jira
								</p>
								<NavLink
									className='py-[10px] text-[rgb(23,43,77)]'
									label={
										<span className='text-[14px]'>
											Profile
										</span>
									}
								/>
								<NavLink
									className='py-[10px] text-[rgb(23,43,77)]'
									label={
										<span className='text-[14px]'>
											Personal
											settings
										</span>
									}
								/>
							</div>
							<Divider my='lg' />
							<NavLink
								label={
									<span className='text-[14px]'>
										Logout
									</span>
								}
								onClick={
									handleLogout
								}
							/>
						</Popover.Dropdown>
					</Popover>
				</div>
			</header>
			{children}
		</>
	)
}
