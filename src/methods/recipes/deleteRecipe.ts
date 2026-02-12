'use server'

import connectDB from '@/lib/connectDB'
import Recipe from '@/models/Recipe'

export const deleteRecipe = async (recipeId: string) => {
	await connectDB()
	try {
		await Recipe.findByIdAndDelete(recipeId)
		return { success: true, code: 200 }
	} catch (e) {
		console.log(e)
		return { success: false, code: 500 }
	}
}
