'use server'

import User from '@/models/User'
import { redirect } from 'next/navigation'

export const fetchUser = async (userId: string, sessionId: string) => {
	if (userId === sessionId) return redirect('/user')

	const foundUser = await User.findOne({ _id: userId })
	return foundUser
}
