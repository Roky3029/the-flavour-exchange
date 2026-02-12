'use server'

import connectDB from '@/lib/connectDB'
import User from '@/models/User'
import { User as UserType } from '@/types/user'

export const hasLikedThePost = async (userId: string, recipeId: string) => {
	await connectDB()
	try {
		const user: UserType | null = await User.findById(userId)
		// By this point, we know the user is authenticated

		return user!.likedPosts.includes(recipeId)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return false
	}
}
