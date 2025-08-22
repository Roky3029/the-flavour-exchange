'use client'

import { useEffect, useState } from 'react'
import { Response } from '@/types/session'

export const useSession = () => {
	const [session, setSession] = useState<Response | null>(null)

	useEffect(() => {
		fetch('/api/session')
			.then(res => res.json())
			.then(setSession)
	}, [])

	// console.log(session)
	return session as Response
}
