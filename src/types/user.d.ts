export interface User {
	_id: string
	name: string
	email: string
	likedPosts: string[]
	following: string[]
	followerCount: number
	createdAt: Date
	updatedAt: Date
	__v: number
}
