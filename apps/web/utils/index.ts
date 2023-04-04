import { AxiosError } from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { v4 } from 'uuid'
import { Notification } from '../stores'

export function uuid() {
	return v4()
}

export function notifyError(error: unknown, notify: (n: Notification) => void) {
	if (error && error instanceof AxiosError) {
		const notification: Notification = {
			type: 'error',
			k: uuid()
		}
		if (error.response) {
			notification.title = error.response.data
		} else if (error.message) {
			notification.title = error.message
		}

		notify(notification)
	}
}

export function deleteTokens() {
	localStorage.removeItem('accessToken')
	deleteCookie('refreshToken')
}

export function getAccessToken() {
	return localStorage.getItem('accessToken')
}

export function getRefreshToken() {
	return getCookie('refreshToken')
}

export function notifySuccess(
	message: string,
	notify: (n: Notification) => void
) {
	if (message) {
		const notification: Notification = {
			type: 'success',
			k: uuid()
		}
		notification.title = message

		notify(notification)
	}
}
