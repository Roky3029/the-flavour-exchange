'use server'

import connectDB from '@/lib/connectDB'
import User from '@/models/User'
import { User as UserType } from '@/types/user'

export const getFollowing = async (id: string) => {
	await connectDB()
	const userData: UserType = (await User.findById(id)) as UserType

	const usersFollowing = await Promise.all(
		userData.following.map(u => {
			return User.findById(u)
		})
	)

	return JSON.parse(JSON.stringify(usersFollowing))
}
