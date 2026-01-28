'use server'

import User from '@/models/User'

export const getFollowers = async (id: string) => {
	const users = await User.find({ following: id })
	return JSON.parse(JSON.stringify(users))
}
