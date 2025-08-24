'use server'

import Recipe from '@/models/Recipe'

export async function createRecipe(formData: FormData) {
	const { title, tag, imageUrl, rating, steps, ingredients, etc, user } =
		formData
}
