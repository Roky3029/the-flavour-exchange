import connectDB from '@/lib/connectDB'
import User from '@/models/User'
import { User as UserType } from '@/types/user'

export const getFollowingCount = async (userId: string) => {
	await connectDB()
	const user: UserType | null = await User.findById(userId)

	if (!user) return

	return user.following.length
}
