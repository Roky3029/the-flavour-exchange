'use server'

import connectDB from '@/lib/connectDB'
import Recipe from '@/models/Recipe'
import User from '@/models/User'
import { Data } from '@/types/recipe'
import { User as UserType } from '@/types/user'

export const addLike = async (recipeId: string, userId: string) => {
	await connectDB()
	// Update the like count on the post
	// add the post id to the liked posts array of the user
	try {
		// const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
		// 	likeCount: likes + 1
		// })
		const recipe: Data | null = await Recipe.findById(recipeId)
		const user: UserType | null = await User.findById(userId)

		if (!recipe || !user) return -1

		const updatedRecipeData = { likeCount: recipe.likeCount + 1 }
		const updatedUserData = {
			likedPosts: [...user!.likedPosts, recipeId]
		}

		const updatedRecipe = await Recipe.findByIdAndUpdate(
			recipeId,
			updatedRecipeData
		)
		const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData)

		if (!updatedRecipe || !updatedUser) return -1

		return recipe.likeCount + 1

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return -1
	}
}

export const removeLike = async (recipeId: string, userId: string) => {
	await connectDB()
	try {
		// const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {
		// 	likeCount: likes + 1
		// })
		const recipe: Data | null = await Recipe.findById(recipeId)
		const user: UserType | null = await User.findById(userId)

		if (!recipe || !user) return -1

		const updatedRecipeData = { likeCount: recipe.likeCount - 1 }
		const updatedUserData = {
			likedPosts: user!.likedPosts.filter(p => p === recipeId)
		}

		const updatedRecipe = await Recipe.findByIdAndUpdate(
			recipeId,
			updatedRecipeData
		)
		const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData)

		if (!updatedRecipe || !updatedUser) return -1

		return recipe.likeCount - 1

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return -1
	}
}
