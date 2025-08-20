import { z } from 'zod'

export const formDataSchema = z.object({
	email: z.email({ error: 'The email is required and/or is invalid' }).trim(),
	password: z.string()
})

export type FormDataZod = z.infer<typeof formDataSchema>
