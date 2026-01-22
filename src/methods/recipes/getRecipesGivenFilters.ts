'use server'

import { etcIntegers } from '@/data/searchFilters'
import Recipe from '@/models/Recipe'
import { Filters } from '@/types/filters'

export const getRecipesGivenFilters = async (filters: Filters) => {
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

	// TODO: implement the connection functionality
	const recipes = await Recipe.find(filteringOptions)

	return JSON.parse(JSON.stringify(recipes))
}
