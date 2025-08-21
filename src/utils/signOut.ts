import { authClient } from '@/lib/authClient'

export const signOut = async () => {
	const data = await authClient.signOut()
	// console.log(data)
	return data
}
