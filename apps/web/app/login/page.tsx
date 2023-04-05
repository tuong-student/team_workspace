'use client'
import { Button } from '@mantine/core'
import { setCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { $Api } from '../../libs'
import { useNotification } from '../../stores'
import { notifyError } from '../../utils'
import './login.scss'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [error, setError] = useState<string | null>(null)
	const notify = useNotification((s) => s.notify)
	const [loading, setLoading] = useState(false)

	function ValidEmail(email: string) {
		return /\S+@\S+\.\S+/.test(email)
	}
	const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		if (ValidEmail(event.target.value)) {
			if (error && Object.keys(error).length > 0) {
				setError(null)
			}
		}
		setEmail(event.target.value)
	}
	const handleEmailBlur: ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		if (!ValidEmail(event.target.value)) {
			setError('Email is invalid')
		} else {
			setError(null)
		}
		setEmail(event.target.value)
	}
	const isValidEmail = () => {
		if (error && Object.keys(error).length > 0) {
			return false
		}
		return true
	}

	const [password, setPassword] = useState('')
	const router = useRouter()
	const handleChangePassword: ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setPassword(e.target.value)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		if (!isValidEmail || (email === '' && password === '')) {
			return
		}

		setLoading(true)
		try {
			const { data } = await $Api.auth.authLoginPost({
				email,
				password
			})

			if (data.accessToken && data.refreshToken) {
				localStorage.setItem(
					'accessToken',
					data.accessToken
				)
				localStorage.setItem(
					'refreshToken',
					data.refreshToken
				)
				setCookie('refreshToken', data.refreshToken, {
					maxAge: 30 * 60
				})
			}

			router.push('/users')
		} catch (e) {
			notifyError(e, notify)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='login'>
			<div className='card'>
				<div className='right'>
					<h1>CHEESERA</h1>
					<p>Login to continue</p>
					<form onSubmit={handleSubmit}>
						<div className='parent-email'>
							<input
								type='email'
								placeholder='Email'
								id='email'
								name='email'
								value={email}
								onChange={
									handleEmailChange
								}
								onBlur={
									handleEmailBlur
								}
							/>
							{error && (
								<span className='errorEmail'>
									{error}
								</span>
							)}
						</div>
						<input
							type='password'
							placeholder='Password'
							id='password'
							name='password'
							value={password}
							onChange={
								handleChangePassword
							}
						/>
						<div>
							<Button
								className='bg-sky-500'
								loaderPosition='center'
								type='submit'
								loading={
									loading
								}
								size='xl'
								fullWidth
							>
								Continue
							</Button>
						</div>
						<span className='continuewith'>
							Or continue with:
						</span>
						<Button
							className=' text-gray-500 shadow'
							variant={'white'}
							size='xl'
							leftIcon={
								<Image
									src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/google-logo.e086107b.svg'
									alt=''
									width={
										24
									}
									height={
										24
									}
								/>
							}
						>
							<span>Google</span>
						</Button>
						<Button
							className=' text-gray-500 shadow'
							variant={'white'}
							size='xl'
							leftIcon={
								<Image
									src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/microsoft-logo.42b61fa1.svg'
									alt=''
									width={
										24
									}
									height={
										24
									}
								/>
							}
						>
							<span>Microsoft</span>
						</Button>
						<Button
							className=' text-gray-500 shadow'
							variant={'white'}
							size='xl'
							leftIcon={
								<Image
									src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/apple-logo.4f2453fb.svg'
									alt=''
									width={
										24
									}
									height={
										24
									}
								/>
							}
						>
							<span>Apple</span>
						</Button>
						<Button
							className=' text-gray-500 shadow'
							variant={'white'}
							size='xl'
							leftIcon={
								<Image
									src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/slack-logo.0390f069.svg'
									alt=''
									width={
										24
									}
									height={
										24
									}
								/>
							}
						>
							<span>Slack</span>
						</Button>
						<ul>
							<li>
								<Link href='/login'>
									{`Can't login?`}
								</Link>
							</li>
							<p>•</p>
							<li>
								<Link href='/login'>
									Create
									an
									account
								</Link>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</div>
	)
}
