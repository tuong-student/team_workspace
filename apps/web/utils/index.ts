import { AxiosError } from 'axios'
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
