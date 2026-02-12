'use server'

import connectDB from '@/lib/connectDB'
import Recipe from '@/models/Recipe'
import User from '@/models/User'
import { Data } from '@/types/recipe'

export const fetchRecipe = async (id: string) => {
	await connectDB()

	const data = await Recipe.findOne({ _id: id })
		.populate({ path: 'user', model: User })
		.lean()
		.exec()

	return JSON.parse(JSON.stringify(data)) as Data
}
