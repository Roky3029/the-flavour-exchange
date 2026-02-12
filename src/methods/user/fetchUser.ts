'use server'

import connectDB from '@/lib/connectDB'
import User from '@/models/User'

export const fetchUser = async (userId: string) => {
	await connectDB()
	try {
		const foundUser = await User.findOne({ _id: userId })
		return foundUser
	} catch (e) {
		return
	}
}
