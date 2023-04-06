export const baseURL = 'https://api-fahasa-nomorechokedboy.cloud.okteto.net'

export const mediaURL = `${baseURL}/api/v1/media`

export const AppRoute = {
	root: '/',
	login: '/login',
	users: {
		root: '/users',
		accounts: '/accounts',
		groups: '/groups'
	},
	projects: {
		root: '/projects',
		board: '/board',
		backlog: '/backlog',
		roadmap: '/roadmap',
		settings: {
			root: '/settings',
			details: '/details'
		}
	}
}

export function getNestedUsersRoute(route: keyof (typeof AppRoute)['users']) {
	if (route === 'root') {
		return AppRoute.users.root
	}

	return `${AppRoute.users.root}${AppRoute.users[route]}`
}

export function getNestedProjectRoute(
	route: keyof (typeof AppRoute)['projects']
) {
	if (route === 'root') {
		return AppRoute.projects.root
	}

	return `${AppRoute.projects.root}${AppRoute.projects[route]}`
}
