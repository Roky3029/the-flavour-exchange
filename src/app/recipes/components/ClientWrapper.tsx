'use client'

import { Navbar } from '@/components/Navbar'
import SearchFilters from './SearchFilters'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { Filters } from '@/types/filters'
import { PuffLoader } from 'react-spinners'
import { getRecipesGivenFilters } from '@/methods/recipes/getRecipesGivenFilters'
import { Data } from '@/types/recipe'
import Recipes from '@/app/user/components/Recipes'
import { LIMIT_PER_SEARCH } from '@/data/consts'
import { useHandlePagination } from '@/hooks/useHandlePagination'

interface ClientWrapperProps {
	sessionId: string | undefined
}

export default function ClientWrapper({ sessionId }: ClientWrapperProps) {
	const [filters, setFilters] = useState<Filters>({
		text: '',
		type: '',
		categories: [],
		etc: '',
		rating: '',
		connection: 'everyone'
	})
	const [isPending, startTransition] = useTransition()
	const [data, setData] = useState<Data[]>()
	const {
		iteration,
		handleIteration,
		totalNumber,
		setTotalNumber,
		paginationDisabled,
		setPaginationDisabled
	} = useHandlePagination()

	const handleSearch = useCallback(() => {
		setPaginationDisabled(false)
		startTransition(async () => {
			const { recipes, totalNumber } = await getRecipesGivenFilters(
				filters,
				LIMIT_PER_SEARCH,
				iteration,
				sessionId
			)
			setData(recipes)
			setTotalNumber(totalNumber)
		})
	}, [filters, iteration, setPaginationDisabled, setTotalNumber])

	useEffect(() => {
		if (!paginationDisabled) {
			handleSearch()
		}
	}, [iteration, handleSearch, paginationDisabled])

	return (
		<div className='flex flex-col items-center justify-center gap-10 pb-32 w-full'>
			<Navbar />

			<SearchFilters
				filters={filters}
				setFilters={setFilters}
				handleSearch={handleSearch}
				sessionId={sessionId}
			/>

			{isPending && <PuffLoader color='green' />}

			{data && !isPending && (
				<Recipes
					recipes={data}
					variant
					handleIteration={handleIteration}
					totalNumber={totalNumber}
				/>
			)}
		</div>
	)
}
