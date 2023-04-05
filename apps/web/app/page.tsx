'use client'
import { Button, Overlay, PasswordInput, TextInput } from '@mantine/core'
import {
	hasLength,
	isEmail,
	matches,
	matchesField,
	useForm
} from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { redirect, useRouter } from 'next/navigation'
import { useEffect as useFootgun } from 'react'
import { AppRoute } from '../constants'
import { $Api } from '../libs'
import { useNotify } from '../stores'
import { notifyError, uuid } from '../utils'
import AppPasswordInput from './AppPasswordInput'

type FormData = {
	email: string
	fullName: string
	password: string
	confirmationPassword: string
}

async function getAppInit() {
	return $Api.admin.adminInitGet().then((resp) => resp.data)
}

export default function Home() {
	const router = useRouter()
	const notify = useNotify()
	const { data } = useQuery({ queryKey: ['init'], queryFn: getAppInit })
	const form = useForm<FormData>({
		initialValues: {
			email: '',
			fullName: '',
			password: '',
			confirmationPassword: ''
		},

		validate: {
			email: isEmail('Invalid email'),
			fullName: hasLength(
				{ min: 8, max: 30 },
				'Name must be 8-30 characters long'
			),
			confirmationPassword: matchesField(
				'password',
				'Passwords are not the same'
			),
			password: matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				null
			)
		},
		validateInputOnBlur: true
	})
	async function handleSubmit({ email, fullName, password }: FormData) {
		try {
			await $Api.admin.adminRegisterPost({
				email,
				fullName,
				password
			})
			notify({
				type: 'success',
				k: uuid(),
				title: 'Create account success!'
			})
			router.push(AppRoute.login)
		} catch (e) {
			notifyError(e, notify)
		}
	}
	function checkForFirstAdmin() {
		if (data?.hasAdmin) {
			return redirect(AppRoute.login)
		}
	}

	const page =
		!data || data.hasAdmin === true ? (
			<Overlay className='bg-[rgb(24,24,38)]' />
		) : (
			<main className='h-full w-full py-[5%] bg-[rgb(24,24,38)]'>
				<div className='h-full max-w-5xl w-full flex flex-col gap-[20px] p-[40px] rounded-[8px] bg-[rgb(33,33,52)] m-auto'>
					<div className='grid place-items-center self-center'>
						<Image
							alt='App logo'
							src={'/logo.png'}
							width={50}
							height={50}
						/>
					</div>
					<div className='grid place-items-center gap-[8px] text-white text-center'>
						<h1 className='text-[30px] font-bold'>
							Welcome to Atlassian!
						</h1>
						<p className='text-[14px] text-neutral-400 font-medium'>
							Credentials are only
							used to authentication
							in Atlassian. All
							<br />
							saved data will be
							stored in your database
						</p>
					</div>
					<form
						className='flex flex-col gap-[20px]'
						onSubmit={form.onSubmit(
							handleSubmit
						)}
					>
						<TextInput
							size={'xl'}
							classNames={{
								input: 'bg-transparent border-neutral-500 text-white'
							}}
							label={
								<span className='text-white font-bold text-[16px]'>
									Full
									name
								</span>
							}
							placeholder='Joe mama'
							{...form.getInputProps(
								'fullName'
							)}
							withAsterisk
						/>
						<TextInput
							size={'xl'}
							classNames={{
								input: 'bg-transparent border-neutral-500 text-white'
							}}
							label={
								<span className='text-white font-bold text-[16px]'>
									Email
								</span>
							}
							placeholder='e.g.johndoe@gmail.com'
							{...form.getInputProps(
								'email'
							)}
							withAsterisk
						/>
						<AppPasswordInput
							{...form.getInputProps(
								'password'
							)}
						/>
						<PasswordInput
							size={'xl'}
							classNames={{
								input: 'bg-transparent border-neutral-500',
								innerInput: 'text-white'
							}}
							label={
								<span className='text-white font-bold text-[16px]'>
									Confirmation
									password
								</span>
							}
							{...form.getInputProps(
								'confirmationPassword'
							)}
							withAsterisk
						/>
						<Button
							className='bg-indigo-700'
							type='submit'
							size={'xl'}
						>
							<span className='text-white font-bold text-[16px]'>
								{"Let's start"}
							</span>
						</Button>
					</form>
				</div>
			</main>
		)

	useFootgun(checkForFirstAdmin, [data?.hasAdmin])

	return page
}
