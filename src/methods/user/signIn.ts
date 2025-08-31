import { authClient } from '@/lib/authClient'
import { FormDataZod } from '@/schemas/logInSchema'

export const signIn = async (formData: FormDataZod) => {
	const { data, error } = await authClient.signIn.email({
		email: formData.email,
		password: formData.password,
		rememberMe: true
	})

	return { data, error }
}
