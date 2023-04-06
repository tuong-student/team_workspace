'use client'
import { InlineEditableTextfield } from '@atlaskit/inline-edit'
import {
	ActionIcon,
	Breadcrumbs,
	Button,
	FileButton,
	NavLink,
	Popover
} from '@mantine/core'
import { useForm } from '@mantine/form'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import EllipsisIcon from '../../../../Icons/EllipsisIcon.svg'

type FormData = {
	name: string
	key: string
	owner: number
	iconUrl: string
}

export default function DetailsPage({ params }: { params: { id: number } }) {
	const [file, setFile] = useState<File | null>(null)
	const form = useForm<FormData>({
		initialValues: { owner: 0, key: '', name: '', iconUrl: '' }
	})
	const [value, setValue] = useState('Initial Value')
	const items = [
		{ title: 'Project', href: '/projects' },
		{ title: `${params.id}`, href: `/projects/board/${params.id}` },
		{
			title: 'Project settings',
			href: `/projects/${params.id}/settings/details`
		}
	].map((item, index) => (
		<Link
			className='text-[14px] text-[rgb(107,119,140)]'
			href={item.href}
			key={index}
		>
			{item.title}
		</Link>
	))

	function handleFileChange(payload: File | null) {
		setFile(payload)
	}

	return (
		<main className='h-full w-full p-[40px]'>
			<div className='h-full w-full text-[rgb(23,43,77)] max-w-[976px] m-auto flex flex-col gap-[8px]'>
				<Breadcrumbs className='py-[5px] flex items-center'>
					{items}
				</Breadcrumbs>
				<header className='flex flex-row items-center justify-between'>
					<h1 className='text-[24px] font-medium'>
						Details
					</h1>
					<Popover position='bottom-end'>
						<Popover.Target>
							<ActionIcon
								size={'xl'}
								variant='subtle'
							>
								<EllipsisIcon />
							</ActionIcon>
						</Popover.Target>

						<Popover.Dropdown className='px-0'>
							<NavLink
								className='px-[16px] py-[8px]'
								label={
									<span className='text-[14px] text-[rgb(23,43,77)]'>
										Move
										to
										trash
									</span>
								}
							/>
						</Popover.Dropdown>
					</Popover>
				</header>
				<div className='flex justify-center'>
					<form className='flex flex-col gap-[28px] max-w-[352px] w-full'>
						<div className='flex flex-col items-center gap-[16px] pb-[4px]'>
							<Image
								className='rounded'
								src='https://api.dicebear.com/6.x/initials/svg?seed=admin'
								width={128}
								height={128}
								alt='Project icon'
							/>
							<FileButton
								onChange={
									handleFileChange
								}
								accept='image/png,image/jpeg,image/svg'
							>
								{(props) => (
									<Button
										{...props}
										className='bg-gray-100 hover:!bg-gray-200'
										size='lg'
									>
										<span className='text-[rgb(66,82,110)] text-[14px] font-medium'>
											Change
											icon
										</span>
									</Button>
								)}
							</FileButton>
						</div>
						<InlineEditableTextfield
							onConfirm={(value) =>
								setValue(value)
							}
							defaultValue={value}
							label={
								(
									<span className='text-[14px]'>
										Name
									</span>
								) as unknown as string
							}
							placeholder='Name'
							readViewFitContainerWidth
							hideActionButtons
						/>
						<InlineEditableTextfield
							onConfirm={(value) =>
								setValue(value)
							}
							defaultValue={value}
							label={
								(
									<span className='text-[14px]'>
										Key
									</span>
								) as unknown as string
							}
							placeholder='Key'
							readViewFitContainerWidth
							hideActionButtons
						/>
						<InlineEditableTextfield
							onConfirm={(value) =>
								setValue(value)
							}
							defaultValue={value}
							label={
								(
									<span className='text-[14px]'>
										Project
										lead
									</span>
								) as unknown as string
							}
							placeholder='Project lead'
							readViewFitContainerWidth
							hideActionButtons
						/>
					</form>
				</div>
			</div>
		</main>
	)
}
