import axiosGlobal, { AxiosError, CreateAxiosDefaults } from 'axios'
import { setCookie } from 'cookies-next'
import {
	AdminApiFactory,
	AuthApiFactory,
	ProjectApiFactory,
	UserApiFactory
} from '../codegen/api'
import { baseURL } from '../constants'
import { deleteTokens, getAccessToken, getRefreshToken } from '../utils'

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

	const accessToken = getAccessToken()

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

			const refreshToken = getRefreshToken()?.toString()

			if (!refreshToken) {
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
					setCookie(
						'refreshToken',
						data.refreshToken
					)
					error.response.config.headers[
						'Authorization'
					] = `Bearer ${data.accessToken}`

					return axios(error.response.config)
				})
				.catch((e) => {
					deleteTokens()
					return Promise.reject(e)
				})
				.finally(createAxiosResponseInterceptor)
		}
	)
}

createAxiosResponseInterceptor()

const auth = AuthApiFactory(undefined, undefined, axios)
const admin = AdminApiFactory(undefined, undefined, axios)
const user = UserApiFactory(undefined, undefined, axios)
const project = ProjectApiFactory(undefined, undefined, axios)

export const $Api = {
	admin,
	auth,
	user,
	project
}
