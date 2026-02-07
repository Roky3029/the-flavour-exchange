'use server'

import User from '@/models/User'
import { User as UserType } from '@/types/user'

export const getFollowing = async (id: string) => {
	const userData: UserType = (await User.findById(id)) as UserType

	const usersFollowing = await Promise.all(
		userData.following.map(u => {
			return User.findById(u)
		})
	)

	return JSON.parse(JSON.stringify(usersFollowing))
}
