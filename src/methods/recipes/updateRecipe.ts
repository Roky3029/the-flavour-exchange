/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import connectDB from '@/lib/connectDB'
import Recipe from '@/models/Recipe'
import { RecipeFormZod } from '@/schemas/recipeSchema'

export const updateRecipe = async (
	formData: RecipeFormZod,
	recipeId: string
) => {
	await connectDB()
	try {
		const dataToUpdate = { ...formData, labels: formData.categories }
		const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate)

		return { success: true, code: 200, data: updatedRecipe._id.toString() }
	} catch (e) {
		return { success: false, code: 500, data: null }
	}
}
