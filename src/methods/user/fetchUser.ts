'use server'

import User from '@/models/User'
import { redirect } from 'next/navigation'

export const fetchUser = async (userId: string, sessionId: string) => {
	try {
		if (userId === sessionId) return redirect('/user')

		const foundUser = await User.findOne({ _id: userId })
		return foundUser
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		// throw new Error('There was an error: ' + e)
		return
	}
}
