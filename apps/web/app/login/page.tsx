'use client'
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

	function ValidEmail(email: string) {
		return /\S+@\S+\.\S+/.test(email)
	}
	const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (
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
		if (!isValidEmail) {
			return
		}

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
		}
	}

	return (
		<div className='login'>
			<div className='card'>
				<div className='right'>
					<h1>CHEESERA</h1>
					<p>Login to continue</p>
					<form onSubmit={handleSubmit}>
						{error && (
							<span
								style={{
									color: 'red',
									fontSize: '10px'
								}}
							>
								{error}
							</span>
						)}
						<input
							type='email'
							placeholder='Email'
							id='email'
							name='email'
							value={email}
							onChange={
								handleEmailChange
							}
						/>

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
						<button type='submit'>
							Continue
						</button>
						<span>Or contimue with:</span>
						<button>
							<Image
								src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/google-logo.e086107b.svg'
								alt=''
								width={24}
								height={24}
							></Image>
							<span>Google</span>
						</button>
						<button>
							<Image
								src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/microsoft-logo.42b61fa1.svg'
								alt=''
								width={24}
								height={24}
							></Image>
							<span>Microsoft</span>
						</button>
						<button>
							<Image
								src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/apple-logo.4f2453fb.svg'
								alt=''
								width={24}
								height={24}
							></Image>
							<span>Apple</span>
						</button>
						<button>
							<Image
								src='https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.429/static/media/slack-logo.0390f069.svg'
								alt=''
								width={24}
								height={24}
							></Image>
							<span>Slack</span>
						</button>
						<ul>
							<li>
								<Link href='/login'>
									{`Can't login?`}
								</Link>
							</li>
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
