import axiosGlobal, { CreateAxiosDefaults } from 'axios'
import { AuthApi, ProjectApi, UserApi } from '../codegen/api'

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

export const auth = new AuthApi(undefined, undefined, axios)
export const user = new UserApi(undefined, undefined, axios)
export const project = new ProjectApi(undefined, undefined, axios)

// const createAxiosResponseInterceptor = () => {
//     const interceptor = axios.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             /* const id = crypto.randomUUID()
//                 const type: NotificationMessage['type'] = 'error'
//                 let description = 'Internet error' */
//
//             if (error.response?.data?.message) {
//                 // description = error.response?.data?.message
//             }
//
//             if (
//                 error instanceof AxiosError &&
//                 (error.response?.status !== 401 ||
//                     !error.response.headers)
//             ) {
//                 // openNotification({ description, id, type })
//                 return Promise.reject(error)
//             }
//
//             axios.interceptors.response.eject(interceptor)
//
//             const token = useAuthToken()
//             return auth
//                 .authRefreshTokenPost({
//                     refresh_token: token.value.refreshToken
//                 })
//                 .then((resp) => {
//                     token.value.refreshToken =
//                         resp.data.refresh_token
//                     token.value.accessToken =
//                         resp.data.token
//                     error.response.config.headers[
//                         'Authorization'
//                     ] = `Bearer ${resp.data.token}`
//                     return axios(error.response.config)
//                 })
//                 .catch((e) => {
//                     token.value.accessToken = undefined
//                     token.value.refreshToken = undefined
//                     navigateTo('/login')
//                     return Promise.reject(e)
//                 })
//                 .finally(createAxiosResponseInterceptor)
//         }
//     )
// }
//
// createAxiosResponseInterceptor()
