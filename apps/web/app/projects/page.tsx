'use client'
import DynamicTable from '@atlaskit/dynamic-table'
import Select from '@atlaskit/select'
import { ActionIcon, Avatar, Button, TextInput } from '@mantine/core'
import Link from 'next/link'
import { ReactNode } from 'react'
import SearchIcon from '../Icons/SearchIcon.svg'
import StarIcon from '../Icons/StarIcon.svg'
import StarOutlineIcon from '../Icons/StarIconOutline.svg'
import ActionContent from './ActionContent'

type Project = {
	id: number
	name: string
	key: string
	type: string
	lead: {
		id: number
		avatar: string
		name: string
	}
	projectIcon: string
}

const items: Project[] = [
	{
		id: 1,
		name: 'Test Project 1',
		key: 'TP1',
		type: 'Lmao',
		lead: {
			id: 1,
			avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Le Ho Hai Duong',
			name: 'Le Ho Hai Duong'
		},
		projectIcon:
			'https://api.dicebear.com/6.x/icons/svg?seed=Test%20Project%201'
	},
	{
		id: 2,
		name: 'Test Project 2',
		key: 'TP2',
		type: 'Lmao',
		lead: {
			id: 1,
			avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Le Ho Hai Duong',
			name: 'Le Ho Hai Duong'
		},
		projectIcon:
			'https://api.dicebear.com/6.x/icons/svg?seed=Test%20Project%201'
	}
]

function MyRow({ children }: { children: ReactNode }) {
	return (
		<div className='flex flex-row items-center gap-[8px] w-full'>
			{children}
		</div>
	)
}

function RowContent() {
	return items.map((item) => ({
		key: 'lmao',
		cells: [
			{
				key: 'test',
				content: (
					<ActionIcon size='lg'>
						<StarOutlineIcon
							width='24'
							height='24'
						/>
					</ActionIcon>
				)
			},
			{
				key: 'test1',
				content: (
					<MyRow>
						<Avatar
							src={item.projectIcon}
						/>
						<Link
							className='text-blue-500 text-[14px] hover:underline'
							href={`/projects/board/${item.id}`}
						>
							{item.name}
						</Link>
					</MyRow>
				)
			},
			{
				key: 'test2',
				content: (
					<span className='text-[14px] text-[rgb(23,43,77)]'>
						{item.key}
					</span>
				)
			},
			{
				key: 'test3',
				content: (
					<span className='text-[14px] text-[rgb(23,43,77)]'>
						{item.type}
					</span>
				)
			},
			{
				key: 'test4',
				content: (
					<MyRow>
						<Avatar
							src={item.lead.avatar}
						/>
						<span className='text-[14px]'>
							{item.lead.name}
						</span>
					</MyRow>
				)
			},
			{
				key: 'test5',
				content: <ActionContent />
			}
		]
	}))
}

export default function ProjectsPage() {
	return (
		<main className='h-full w-full p-[40px] pt-0'>
			<div className='h-full w-full'>
				<DynamicTable
					caption={
						<div className='flex flex-col gap-[24px]'>
							<div className='flex flex-row items-center justify-between'>
								<h1 className='text-[24px] text-[rgb(23,43,77)] font-medium'>
									Projects
								</h1>
								<Button
									className='bg-blue-500'
									size='lg'
								>
									Create
									project
								</Button>
							</div>
							<div className='flex items-center gap-[16px]'>
								<TextInput
									rightSection={
										<SearchIcon className='text-slate-500' />
									}
									size='lg'
									radius={
										'md'
									}
								/>
								<Select
									inputId='multi-select-example'
									className='multi-select'
									classNamePrefix='react-select'
									isMulti
									isSearchable={
										false
									}
									placeholder='All jira products'
									isDisabled
								/>
							</div>
						</div>
					}
					head={{
						cells: [
							{
								key: 'number',
								content: (
									<StarIcon width='14' />
								),
								width: 2.85
							},
							{
								key: 'string',
								content: 'Name',
								isSortable: true,
								width: 22
							},
							{
								key: 'key',
								content: 'Key',
								isSortable: true,
								width: 12
							},
							{
								key: 'type',
								content: 'Type',
								width: 20
							},
							{
								key: 'lead',
								content: 'Lead',
								width: 16.4
							},
							{
								key: 'action',
								content: '',
								width: 4.15
							}
						]
					}}
					rows={RowContent()}
					isFixedSize
					defaultSortKey='number'
					defaultSortOrder='ASC'
					rowsPerPage={10}
				/>
			</div>
		</main>
	)
}
