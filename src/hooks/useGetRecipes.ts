'use client'

import { useEffect, useState } from 'react'
import { getRecipes } from '@/utils/getRecipes'
import type { Data } from '@/types/recipe' // define your recipe type

const useGetRecipes = (userId: string) => {
	const [recipes, setRecipes] = useState<Data[]>([])

	useEffect(() => {
		;(async () => {
			const data = await getRecipes(userId) // already objects
			setRecipes(data as Data[])
		})()
	}, [userId])

	return recipes
}

export default useGetRecipes
