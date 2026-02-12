'use server'

import User from '@/models/User'
import { getSession } from '../user/getSession'
import { User as UserType } from '@/types/user'
import Recipe from '@/models/Recipe'
import { Data } from '@/types/recipe'
import connectDB from '@/lib/connectDB'

export const fetchLikedRecipes = async (limit: number, iteration: number) => {
	await connectDB()
	const userInfo = await getSession()
	if (!userInfo) return

	const user: UserType | null = await User.findById(userInfo.user.id)
	if (!user) return

	const likedRecipes = user.likedPosts.slice(0, limit * iteration)

	const recipes = await Promise.all(
		likedRecipes.map(lr => {
			return Recipe.findById(lr)
		})
	)

	const fetchedData = await Promise.all(
		user.likedPosts.map(lr => Recipe.findById(lr))
	)

	return JSON.parse(
		JSON.stringify({ recipes, totalNumber: fetchedData.length })
	) as { recipes: Data[]; totalNumber: number }
}
