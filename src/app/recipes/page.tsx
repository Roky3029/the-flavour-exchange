'use client'

import { Navbar } from '@/components/Navbar'
import SearchFilters from './components/SearchFilters'
import { useState, useTransition } from 'react'
import { Filters } from '@/types/filters'
import { PuffLoader } from 'react-spinners'
import { getRecipesGivenFilters } from '@/methods/recipes/getRecipesGivenFilters'
import { Data } from '@/types/recipe'
import Recipes from '@/app/user/components/Recipes'

export default function RecipesSearch() {
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

	const handleSearch = () => {
		startTransition(async () => {
			const res = await getRecipesGivenFilters(filters)
			setData(res)
		})
	}

	return (
		<div className='flex flex-col items-center justify-center gap-10 pb-32 w-full'>
			<Navbar />

			<SearchFilters
				filters={filters}
				setFilters={setFilters}
				handleSearch={handleSearch}
			/>

			{isPending && <PuffLoader color='green' />}

			{/* {data && !isPending && <pre>{JSON.stringify(data)}</pre>} */}
			{data && !isPending && <Recipes recipes={data} variant />}
		</div>
	)
}
