'use server'

import { auth } from '@/lib/auth'
import connectDB from '@/lib/connectDB'
import { headers } from 'next/headers'

export const getSession = async () => {
	await connectDB()
	const session = await auth.api.getSession({
		headers: await headers()
	})

	return session
}
