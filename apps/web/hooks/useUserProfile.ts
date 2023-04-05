import { useQuery } from '@tanstack/react-query'
import { $Api } from '../libs/'
import { useHandleQueryError } from './useHandleQueryError'

export async function getUserProfile() {
	return $Api.auth.authMeGet().then((resp) => resp.data)
}

export function useUserProfile() {
	return useQuery({
		queryKey: ['userProfile'],
		queryFn: getUserProfile,
		onError: useHandleQueryError()
	})
}
