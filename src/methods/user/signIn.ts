import { authClient } from '@/lib/authClient'
import connectDB from '@/lib/connectDB'
import { FormDataZod } from '@/schemas/logInSchema'

export const signIn = async (formData: FormDataZod) => {
	await connectDB()
	const { data, error } = await authClient.signIn.email({
		email: formData.email,
		password: formData.password,
		rememberMe: true
	})

	return { data, error }
}
