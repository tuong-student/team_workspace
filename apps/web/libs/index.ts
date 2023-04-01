import axiosGlobal, { AxiosError, CreateAxiosDefaults } from 'axios'
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

			console.log('In refresh token')

			axios.interceptors.response.eject(interceptor)

			const refreshToken =
				localStorage.getItem('refreshToken')
			if (!refreshToken) {
				console.warn('DEBUG')

				return Promise.reject(Error('No refresh token'))
			}

			return auth
				.authRefreshPost({ refreshToken })
				.then(({ data }) => {
					console.log('Lmao I am dead', data)

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
					localStorage.setItem(
						'refreshToken',
						data.refreshToken
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
