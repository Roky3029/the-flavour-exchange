import User from '@/models/User'
import type { NextAuthOptions } from 'next-auth'
import credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
	providers: [
		credentials({
			name: 'Credentials',
			id: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'text' }
			},
			async authorize(credentials) {
				const user = await User.findOne({
					email: credentials?.email
				}).select('+password')

				if (!user) throw new Error('Wrong email')

				return user
			}
		})
	],
	session: {
		strategy: 'jwt'
	}
}
