'use client'

import { Navbar } from '@/components/Navbar'
import { fetchLikedRecipes } from '@/methods/recipes/fetchLikedRecipes'
import { AnotherUserRecipeCard } from '../../user/[userId]/components/AnotherUserRecipeCard'
import { Title } from '@mantine/core'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import { Tag } from '@/components/RecipeCard'
import { IconHeartFilled } from '@tabler/icons-react'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { Data } from '@/types/recipe'
import { LIMIT_PER_SEARCH } from '@/data/consts'
import { useHandlePagination } from '@/hooks/useHandlePagination'
import MoreResultsButton from '@/components/MoreResultsButton'

export default function PageClient() {
	const [likedRecipes, setLikedRecipes] = useState<Data[] | undefined>(
		undefined
	)
	const [isPending, startTransition] = useTransition()
	const { handleIteration, iteration, setTotalNumber, totalNumber } =
		useHandlePagination()

	const fetchLikedPosts = useCallback(() => {
		startTransition(async () => {
			const data = await fetchLikedRecipes(LIMIT_PER_SEARCH, iteration)

			if (!data) {
				setLikedRecipes([])
				setTotalNumber(0)
			} else {
				setLikedRecipes(data.recipes)
				setTotalNumber(data.totalNumber)
			}
		})
	}, [iteration, setTotalNumber])

	useEffect(() => {
		fetchLikedPosts()
	}, [iteration, fetchLikedPosts])

	return (
		<div className='flex flex-col items-center justify-center gap-10 pb-32 w-full'>
			<Navbar />

			<Title className='text-center pb-20 flex items-center justify-center gap-5'>
				Your <IconHeartFilled stroke={2} color='red' /> recipes
			</Title>

			{!isPending ? (
				<div
					className={`grid ${
						likedRecipes && likedRecipes.length > 0
							? 'xl:grid-cols-3 md:grid-cols-2 grid-cols-1'
							: 'grid-cols-1'
					} px-6 lg:px-40 gap-16 w-full`}
				>
					{likedRecipes && likedRecipes.length !== 0 ? (
						<>
							{likedRecipes.map(lr => (
								<AnotherUserRecipeCard
									id={lr._id}
									image={lr.imageUrl}
									likes={lr.likeCount}
									tags={lr.labels.map(label => {
										const data = filterIconCoincidence('categories', label)
										return data as Tag
									})}
									title={lr.title}
									type={lr.tag}
									key={lr._id.toString()}
									creator={lr.user._id}
									rating={lr.rating}
								/>
							))}
							{totalNumber > likedRecipes.length && (
								<MoreResultsButton handleIteration={handleIteration} />
							)}
						</>
					) : (
						<Title order={2} className='text-center w-full' c='dark'>
							Oops! Seems like you have not liked any recipe
						</Title>
					)}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}
