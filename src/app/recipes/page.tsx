'use client'

import { Navbar } from '@/components/Navbar'
import SearchFilters from './components/SearchFilters'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { Filters } from '@/types/filters'
import { PuffLoader } from 'react-spinners'
import { getRecipesGivenFilters } from '@/methods/recipes/getRecipesGivenFilters'
import { Data } from '@/types/recipe'
import Recipes from '@/app/user/components/Recipes'
import { LIMIT_PER_SEARCH } from '@/data/consts'
import { useHandlePagination } from '@/hooks/useHandlePagination'
import { useSession } from '@/hooks/useSession'

export default function RecipesSearch() {
	const session = useSession()
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
				session?.user.id
			)
			setData(recipes)
			setTotalNumber(totalNumber)
		})
	}, [filters, iteration, setPaginationDisabled, setTotalNumber, session])

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
