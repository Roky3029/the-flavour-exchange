'use server'

import Recipe from '@/models/Recipe'

export const deleteRecipe = async (recipeId: string) => {
	try {
		await Recipe.findByIdAndDelete(recipeId)
		return { success: true, code: 200 }
	} catch (e) {
		console.log(e)
		return { success: false, code: 500 }
	}
}
