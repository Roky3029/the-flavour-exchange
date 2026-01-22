'use server'

import User from '@/models/User'
import { User as UserType } from '@/types/user'

export const hasRatedTheRecipe = async (userId: string, recipeId: string) => {
	try {
		const user: UserType | null = await User.findById(userId)

		if (!user) return false

		return user.ratedRecipes.includes(recipeId)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return false
	}
}
