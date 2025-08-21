export interface Response {
	session: Session
	user: User
}

export interface Session {
	expiresAt: Date
	token: string
	createdAt: Date
	updatedAt: Date
	ipAddress: string
	userAgent: string
	userId: string
	id: string
}

export interface User {
	name: string
	email: string
	emailVerified: boolean
	image: string
	createdAt: Date
	updatedAt: Date
	id: string
}
