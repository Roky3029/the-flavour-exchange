export interface User {
	_id: string
	name: string
	email: string
	likedPosts: string[]
	following: string[]
	followerCount: number
	ratedRecipes: string[]
	createdAt: Date
	updatedAt: Date
	__v: number
}
