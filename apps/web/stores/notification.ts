import { NotificationProps } from '@mantine/core'
import React from 'react'
import { create } from 'zustand'

export type Notification = {
	type: 'error' | 'warning' | 'success'
	k: React.Key
} & NotificationProps

export type NotificationState = {
	notification: Notification[]
	notify: (notification: Notification) => void
	remove: (key: React.Key) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
	notification: [],
	notify: (n) =>
		set((state) => ({ notification: [...state.notification, n] })),
	remove: (key: React.Key) =>
		set((s) => ({
			notification: s.notification.filter((n) => n.k !== key)
		}))
}))

export function useNotification() {
	return useNotificationStore((s) => s.notification)
}

export function useNotify() {
	return useNotificationStore((s) => s.notify)
}

export function useRemoveNotification() {
	return useNotificationStore((s) => s.remove)
}
