'use client'

import { Data } from '@/types/recipe'
import Recipes from './Recipes'
import { useHandlePagination } from '@/hooks/useHandlePagination'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { getRecipes } from '@/methods/recipes/getRecipes'
import { LIMIT_PER_SEARCH } from '@/data/consts'
import { PuffLoader } from 'react-spinners'

interface RecipesWrapperInterface {
	sessionId: string
}

export default function RecipesWrapper({ sessionId }: RecipesWrapperInterface) {
	const { handleIteration, iteration, setTotalNumber, totalNumber } =
		useHandlePagination()

	const [isPending, startTransition] = useTransition()
	const [recipes, setRecipes] = useState<Data[]>([])

	const handleFetch = useCallback(() => {
		startTransition(async () => {
			const data = await getRecipes(sessionId, LIMIT_PER_SEARCH, iteration)

			if (!data) {
				setRecipes([])
				setTotalNumber(0)
			} else {
				setRecipes(data.recipes)
				setTotalNumber(data.totalNumber)
			}
		})
	}, [iteration, setTotalNumber])

	useEffect(() => {
		handleFetch()
	}, [iteration, handleFetch])

	return (
		<>
			{!isPending ? (
				<Recipes
					recipes={recipes as Data[]}
					handleIteration={handleIteration}
					totalNumber={totalNumber}
				/>
			) : (
				<PuffLoader color='green' />
			)}
		</>
	)
}
