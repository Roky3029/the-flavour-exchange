'use client'

import { useEffect, useState } from 'react'
import { getRecipes } from '@/utils/getRecipes'
import type { Data } from '@/types/recipe' // define your recipe type

const useGetRecipes = (userId: string) => {
	const [recipes, setRecipes] = useState<Data[]>([])
	// const [loading, setLoading] = useState(false)

	useEffect(() => {
		// setLoading(true)
		;(async () => {
			const data = await getRecipes(userId) // already objects
			setRecipes(data as Data[])
		})()
	}, [userId])

	// setLoading(false)
	return recipes
}

export default useGetRecipes
