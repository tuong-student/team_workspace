import { useNotify } from '../stores'
import { notifyError } from '../utils'

export function useHandleQueryError() {
	const notify = useNotify()
	function handleError(e: unknown) {
		notifyError(e, notify)
	}

	return handleError
}
