'use server'

import User from '@/models/User'
import { fetchRecipe } from '../recipes/fetchRecipe'
import { User as UserType } from '@/types/user'
import { Data } from '@/types/recipe'
import Recipe from '@/models/Recipe'
import connectDB from '@/lib/connectDB'

export const rateRecipe = async (
	userId: string,
	recipeId: string,
	rating: number
) => {
	await connectDB()
	const user: UserType | null = await User.findOne({ _id: userId })
	const recipe: Data | null = await fetchRecipe(recipeId)

	if (!user || !recipe) return { success: false }

	const newUserRatedArray = [...user.ratedRecipes, recipeId]
	const newRecipeRating = [...recipe.rating, { userId, rating }]

	const updatedUser = await User.findByIdAndUpdate(userId, {
		ratedRecipes: newUserRatedArray
	})
	const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
		rating: newRecipeRating
	})

	if (!updatedRecipe || !updatedUser) return { success: false }

	return JSON.parse(
		JSON.stringify({ success: true, newRatingArray: newRecipeRating })
	)
}

export const removeRate = async (userId: string, recipeId: string) => {
	await connectDB()
	const user: UserType | null = await User.findOne({ _id: userId })
	const recipe: Data | null = await fetchRecipe(recipeId)

	if (!user || !recipe) return { success: false }

	// const newUserRatedArray = [...user.ratedRecipes, recipeId]
	const newUserRatedArray = user.ratedRecipes.filter(r => r === recipeId)
	// const newRecipeRating = [...recipe.rating, { userId, rating }]
	const newRecipeRating = recipe.rating.filter(
		r => r.userId.toString() !== userId
	)

	const updatedUser = await User.findByIdAndUpdate(userId, {
		ratedRecipes: newUserRatedArray
	})
	const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
		rating: newRecipeRating
	})

	if (!updatedRecipe || !updatedUser) return { success: false }

	return JSON.parse(
		JSON.stringify({ success: true, newRatingArray: newRecipeRating })
	)
}
