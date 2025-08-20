'use server'

import User from '@/models/User'
import { FormDataZod } from '@/schemas/signUpSchema'

export async function registerUser(data: FormDataZod) {
	try {
		const { email, name, password } = data

		const alreadyExists = await User.findOne({ email })

		if (alreadyExists) return { status: 400, message: 'User already exists' }

		const user = new User({ name, email, password })
		await user.save()
		console.log('User registered')
		return { status: 200, message: 'Success' }
	} catch (e) {
		throw new Error('Failed to register the user', e as ErrorOptions)
	}
}
