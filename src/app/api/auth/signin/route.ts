import { NextResponse } from 'next/server'
import User from '@/models/User'
import { signIn } from '../../../../../auth'

export const POST = async (req: Request) => {
	try {
		const data = await req.json()
		// // console.log(name, email, password)

		// const alreadyExists = await User.findOne({ email })

		// if (alreadyExists)
		// 	return NextResponse.json('User is already registered', { status: 400 })

		// const newUser = new User({ name, email, password })
		// const saved = newUser.save()
		const result = await signIn('credentials', data)
		return NextResponse.json(`Recibido: ${result}`, { status: 200 })
	} catch (e) {
		console.log(e)
		return NextResponse.json('Error', { status: 500 })
	}
}
