'use server'

import { getSession } from '@/methods/user/getSession'
import { redirect } from 'next/navigation'

export const checkIfUserIsLogged = async () => {
	const session = await getSession()

	if (!session) {
		redirect('/auth/login')
	}
}
