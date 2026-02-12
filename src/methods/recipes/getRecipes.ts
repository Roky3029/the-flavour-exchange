'use server'

import mongoose from 'mongoose'
import Recipe from '@/models/Recipe'
import User from '@/models/User'
import connectDB from '@/lib/connectDB'

export const getRecipes = async (
	userId: string,
	limit: number,
	iteration: number
) => {
	await connectDB()
	const userObjectId = new mongoose.Types.ObjectId(userId)
	const totalNumber = await Recipe.find({ user: userObjectId })
		.populate({ path: 'user', model: User })
		.lean()
		.countDocuments()
		.exec()
	const recipes = await Recipe.find({ user: userObjectId })
		.populate({ path: 'user', model: User })
		.lean()
		.limit(limit * iteration)
		.exec()

	return JSON.parse(JSON.stringify({ recipes, totalNumber }))
}
