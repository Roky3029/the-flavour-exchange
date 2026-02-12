'use server'

import connectDB from '@/lib/connectDB'
import User from '@/models/User'

export const getFollowers = async (id: string) => {
	await connectDB()
	const users = await User.find({ following: id })
	return JSON.parse(JSON.stringify(users))
}
