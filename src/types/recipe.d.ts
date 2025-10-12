import { Rating } from '@/models/Recipe'

export interface Data {
	_id: string
	title: string
	tag: string
	imageUrl: string
	rating: Rating[]
	steps: string[]
	ingredients: string[]
	etc: number
	user: User
	labels: string[]
	createdAt: Date
	updatedAt: Date
	__v: number
	likeCount: number
}

export interface User {
	_id: string
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
	__v: number
}
