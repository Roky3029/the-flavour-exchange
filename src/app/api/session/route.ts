import { NextResponse } from 'next/server'
import { getSession } from '@/methods/user/getSession'

export async function GET() {
	const session = await getSession()
	return NextResponse.json(session)
}
