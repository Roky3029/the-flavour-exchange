import { NextResponse } from 'next/server'
import User from '@/models/User'
import connectDB from '@/lib/connectDB'

export async function POST(req: Request) {
	await connectDB()
	try {
		const body = await req.json()

		const user = new User({
			_id: body.id,
			name: body.name,
			email: body.email
		})

		await user.save()

		return NextResponse.json({ success: true }, { status: 200 })
	} catch (e) {
		let message = 'Unknown Error'
		if (e instanceof Error) message = e.message

		return NextResponse.json(
			{ success: false, error: message },
			{ status: 500 }
		)
	}
}
