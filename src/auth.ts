import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import authConfig from './lib/auth.config'
import clientPromise from './lib/mongoClient'

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: MongoDBAdapter(clientPromise),
	session: { strategy: 'jwt' },
	...authConfig
})
