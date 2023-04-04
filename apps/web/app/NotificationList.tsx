import { Notification } from '@mantine/core'
import { useEffect as useFootgun, useRef } from 'react'
import {
	Notification as NotificationItemProps,
	useNotification,
	useRemoveNotification
} from '../stores'

function NotificationItem({ type, k, ...props }: NotificationItemProps) {
	const removeNotification = useRemoveNotification()
	const timeout = useRef<NodeJS.Timeout>()
	const color =
		type === 'error'
			? 'red'
			: type === 'warning'
			? 'yellow'
			: 'green'
	function handleClose() {
		removeNotification(k)
	}
	function handleAutoClose() {
		timeout.current = setTimeout(handleClose, 5000)
	}
	function cancelDelay() {
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
	const notification = useNotification()

	return (
		<div className='fixed top-[80px] right-0 z-50'>
			{notification.map((n) => (
				<NotificationItem {...n} key={n.k} />
			))}
		</div>
	)
}
