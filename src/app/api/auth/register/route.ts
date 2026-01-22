import { NextResponse } from 'next/server'
import User from '@/models/User'

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const user = new User({
			_id: body.id,
			name: body.name,
			email: body.email
		})

		await user.save()

		return NextResponse.json({ success: true }, { status: 200 })
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (e: any) {
		NextResponse.json({ success: false, error: e.message }, { status: 500 })
	}
}
