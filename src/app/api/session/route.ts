import { NextResponse } from 'next/server'
import { getSession } from '@/utils/getSession'

export async function GET() {
	const session = await getSession()
	return NextResponse.json(session)
}
