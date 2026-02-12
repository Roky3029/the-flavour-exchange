'use server'

import connectDB from '@/lib/connectDB'
import User from '@/models/User'
import { User as UserType } from '@/types/user'

export const checkIfUserFollowsAnotherUser = async (
	userId: string,
	followingId: string
) => {
	await connectDB()
	try {
		const user: UserType | null = await User.findById(userId)

		return user!.following.includes(followingId)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return false
	}
}
