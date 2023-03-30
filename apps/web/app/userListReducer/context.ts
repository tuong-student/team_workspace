import { createContext, Dispatch } from 'react'
import { UserListActions } from './actions'
import { initialUserList, UserListState } from './state'

const UserContext = createContext<{
	state: UserListState
	dispatch: Dispatch<UserListActions>
}>({
	state: initialUserList,
	dispatch: () => undefined
})

export default UserContext
