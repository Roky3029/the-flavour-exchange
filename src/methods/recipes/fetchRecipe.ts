'use server'

import Recipe from '@/models/Recipe'
import User from '@/models/User'

export const fetchRecipe = async (id: string) => {
	const data = await Recipe.findOne({ _id: id })
		.populate({ path: 'user', model: User })
		.lean()
		.exec()

	return data
}
