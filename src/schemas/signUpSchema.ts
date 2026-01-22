import { z } from 'zod'

export const formDataSchema = z
	.object({
		name: z.string().min(1, { error: 'The name is required' }),
		email: z.email({ error: 'The email is required and/or is invalid' }).trim(),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' })
			.regex(/[a-zA-Z]/, {
				message: 'Password must contain at least one letter.'
			})
			.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
			.regex(/[^a-zA-Z0-9]/, {
				message: 'Password must contain at least one special character.'
			})
			.trim(),
		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long' })
			.regex(/[a-zA-Z]/, {
				message: 'Password must contain at least one letter.'
			})
			.regex(/[0-9]/, { message: 'Password must contain at least one number.' })
			.regex(/[^a-zA-Z0-9]/, {
				message: 'Password must contain at least one special character.'
			})
			.trim()
	})
	.refine(data => data.password === data.confirmPassword, {
		error: 'Passwords do not match',
		path: ['confirmPassword']
	})

export type FormDataZod = z.infer<typeof formDataSchema>
