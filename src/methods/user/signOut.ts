import { authClient } from '@/lib/authClient'
import connectDB from '@/lib/connectDB'

export const signOut = async () => {
	await connectDB()
	return await authClient.signOut()
}
