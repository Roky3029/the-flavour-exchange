'use server'

import User from '@/models/User'
import { getSession } from '../user/getSession'
import { User as UserType } from '@/types/user'
import Recipe from '@/models/Recipe'
import { Data } from '@/types/recipe'

export const fetchLikedRecipes = async () => {
	const userInfo = await getSession()
	if (!userInfo) return

	const user: UserType | null = await User.findById(userInfo.user.id)
	if (!user) return

	const likedRecipes = user.likedPosts

	const fetchedData = await Promise.all(
		likedRecipes.map(lr => Recipe.findById(lr))
	)

	return JSON.parse(JSON.stringify(fetchedData)) as Data[]
}
