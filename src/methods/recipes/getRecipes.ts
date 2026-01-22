'use server'

import mongoose from 'mongoose'
import Recipe from '@/models/Recipe'
import User from '@/models/User'

export const getRecipes = async (userId: string) => {
	const userObjectId = new mongoose.Types.ObjectId(userId)
	const recipes = await Recipe.find({ user: userObjectId })
		.populate({ path: 'user', model: User })
		.lean()
		.exec()

	return JSON.parse(JSON.stringify(recipes))
}
