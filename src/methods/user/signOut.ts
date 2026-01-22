import { authClient } from '@/lib/authClient'

export const signOut = async () => {
	return await authClient.signOut()
}
