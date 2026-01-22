import Recipe from '@/models/Recipe'

export const getRecipesByUserId = async (userId: string) => {
	const recipes = await Recipe.find({ user: userId })
	return JSON.parse(JSON.stringify(recipes))
}
