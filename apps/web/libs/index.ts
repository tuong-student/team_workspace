import axiosGlobal, { AxiosError, CreateAxiosDefaults } from 'axios'
import { getCookie } from 'cookies-next'
import {
	AuthApiFactory,
	ProjectApiFactory,
	UserApiFactory
} from '../codegen/api'

const baseURL = 'https://api-fahasa-nomorechokedboy.cloud.okteto.net'

const configs: CreateAxiosDefaults = {
	baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
}

const axios = axiosGlobal.create(configs)

axios.interceptors.request.use((config: any) => {
	const customHeaders = {
		Authorization: ''
	}

	const accessToken = localStorage.getItem('accessToken')

	if (accessToken) customHeaders.Authorization = `Bearer ${accessToken}`

	return {
		...config,
		headers: {
			...customHeaders,
			...config.headers
		}
	}
})

const createAxiosResponseInterceptor = () => {
	const interceptor = axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (
				error instanceof AxiosError &&
				(error.response?.status !== 401 ||
					!error.response.headers)
			) {
				return Promise.reject(error)
			}

			axios.interceptors.response.eject(interceptor)

			const refreshToken =
				getCookie('refreshToken')?.toString()
			if (!refreshToken) {
				console.warn('DEBUG')

				return Promise.reject(Error('No refresh token'))
			}

			return auth
				.authRefreshPost({ refreshToken })
				.then(({ data }) => {
					if (
						!data.refreshToken ||
						!data.accessToken
					) {
						throw Error('Server error')
					}

					localStorage.setItem(
						'accessToken',
						data.accessToken
					)
					error.response.config.headers[
						'Authorization'
					] = `Bearer ${data.accessToken}`

					return axios(error.response.config)
				})
				.catch((e) => {
					localStorage.removeItem('accessToken')
					localStorage.removeItem('refreshToken')
					return Promise.reject(e)
				})
				.finally(createAxiosResponseInterceptor)
		}
	)
}

createAxiosResponseInterceptor()

const auth = AuthApiFactory(undefined, undefined, axios)
const user = UserApiFactory(undefined, undefined, axios)
const project = ProjectApiFactory(undefined, undefined, axios)

export const $Api = {
	auth,
	user,
	project
}
