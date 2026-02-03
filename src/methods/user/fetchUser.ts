'use server'

import User from '@/models/User'
import { redirect } from 'next/navigation'

export const fetchUser = async (userId: string) => {
	try {
		const foundUser = await User.findOne({ _id: userId })
		return foundUser
	} catch (e) {
		return
	}
}
