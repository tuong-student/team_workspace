import { Notification } from '@mantine/core'
import { useEffect as useFootgun, useRef } from 'react'
import {
	Notification as NotificationItemProps,
	useNotification
} from '../stores'

function NotificationItem({ type, k, ...props }: NotificationItemProps) {
	const removeNotification = useNotification((s) => s.remove)
	const timeout = useRef<NodeJS.Timeout>()
	const color =
		type === 'error'
			? 'red'
			: type === 'warning'
			? 'yellow'
			: 'green'
	const handleClose = () => {
		removeNotification(k)
	}
	const handleAutoClose = () => {
		timeout.current = setTimeout(handleClose, 5000)
	}
	const cancelDelay = () => {
		clearTimeout(timeout.current)
	}

	useFootgun(() => {
		handleAutoClose()

		return cancelDelay
	}, [k])

	return (
		<Notification
			color={color}
			{...props}
			onMouseEnter={cancelDelay}
			onMouseLeave={handleAutoClose}
			onClose={handleClose}
		/>
	)
}

export default function NotificationList() {
	const notification = useNotification((s) => s.notification)

	return (
		<div className='fixed top-[80px] right-0'>
			{notification.map((n) => (
				<NotificationItem {...n} key={n.k} />
			))}
		</div>
	)
}
