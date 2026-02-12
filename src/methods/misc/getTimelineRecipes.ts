'use server'

import mongoose from 'mongoose'
import Recipe from '@/models/Recipe'
import User from '@/models/User'
import connectDB from '@/lib/connectDB'

export const getTimelineRecipes = async (userId: string) => {
	await connectDB()
	const followingIds = (await User.findOne({ _id: userId }))['following']

	// We will get the recipes from the users we are following and are 1 month or less old
	const recipesFromFollowingUsers = (
		await Promise.all(
			followingIds.map(async (id: mongoose.ObjectId) => {
				const recipesFromUser = await Recipe.find({ user: id })
					.populate({ path: 'user', model: User })
					.lean()
					.exec()

				const now = new Date()
				const oneMonthAgo = new Date(now)
				oneMonthAgo.setMonth(now.getMonth() - 1)

				return recipesFromUser.filter(
					recipe => recipe.updatedAt >= oneMonthAgo && recipe.updatedAt <= now
				)
			})
		)
	).flat()

	// We will as well get the 15 most recent recipes from whichever user (not itself)
	const mostRecentRecipes = await Recipe.find({ user: { $nin: followingIds } })
		.sort({ updatedAt: -1 }) // newest first
		.limit(15)
		.populate({ path: 'user', model: User })
		.lean()
		.exec()

	const result = {
		recipesFromFollowingUsers,
		mostRecentRecipes
	}

	return JSON.parse(JSON.stringify(result))

	// Possible future implementation? -> get some reipces from friends of friends or something?
}
