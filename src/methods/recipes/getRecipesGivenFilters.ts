'use server'

import { etcIntegers } from '@/data/searchFilters'
import connectDB from '@/lib/connectDB'
import Recipe from '@/models/Recipe'
import User from '@/models/User'
import { Filters } from '@/types/filters'
import { User as UserType } from '@/types/user'

export const getRecipesGivenFilters = async (
	filters: Filters,
	limit: number,
	iteration: number,
	userId: string | undefined
) => {
	await connectDB()
	let filteringOptions = {}

	if (filters.text)
		filteringOptions = { ...filteringOptions, title: filters.text }

	if (filters.type)
		filteringOptions = { ...filteringOptions, tag: filters.type }

	if (filters.categories.length > 0)
		filteringOptions = {
			...filteringOptions,
			labels: { $all: filters.categories }
		}

	if (filters.etc) {
		if (filters.etc === '+1h') {
			filteringOptions = {
				...filteringOptions,
				etc: {
					$gte: etcIntegers[filters.etc as keyof typeof etcIntegers]?.min
				}
			}
		} else {
			filteringOptions = {
				...filteringOptions,
				etc: {
					$gte: etcIntegers[filters.etc as keyof typeof etcIntegers]?.min,
					$lte: etcIntegers[filters.etc as keyof typeof etcIntegers]?.max
				}
			}
		}
	}

	if (filters.rating)
		filteringOptions = {
			...filteringOptions,
			rating: { $gte: filters.rating.split('-')[1] }
			// the format of the rating ID is min-X, X being the number, so we get that
		}

	if (userId) {
		const userWhoCalledTheFetch: UserType | null = await User.findById(userId)

		if (!userWhoCalledTheFetch) return

		if (filters.connection === 'following') {
			filteringOptions = {
				...filteringOptions,
				user: userWhoCalledTheFetch.following
			}
		}
	}

	const recipes = await Recipe.find(filteringOptions)
		.limit(limit * iteration)
		.populate({ path: 'user', model: User })
		.lean()
		.exec()
	const totalNumber = await Recipe.find(filteringOptions).countDocuments()

	return JSON.parse(JSON.stringify({ recipes, totalNumber }))
}
