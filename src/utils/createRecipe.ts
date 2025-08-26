'use server'

import Recipe from '@/models/Recipe'
import { RecipeFormZod } from '@/schemas/recipeSchema'
import { getSession } from './getSession'

export async function createRecipe(formData: RecipeFormZod) {
	try {
		const { title, tag, imageUrl, steps, ingredients, etc, categories } =
			formData

		const session = await getSession()

		const recipe = new Recipe({
			title,
			tag,
			imageUrl,
			rating: 0,
			steps,
			ingredients,
			etc,
			user: session?.user.id,
			labels: categories
		})

		const result = await recipe.save()

		return { success: true, code: 200, data: result._id.toString() }
	} catch (e) {
		return { success: false, code: 500, msg: e }
	}
}
