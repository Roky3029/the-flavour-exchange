'use client'

import MoreResultsButton from '@/components/MoreResultsButton'
import { RecipeCard, Tag } from '@/components/RecipeCard'
import { Data } from '@/types/recipe'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import { Title } from '@mantine/core'
import Link from 'next/link'

interface RecipesProps {
	recipes: Data[]
	variant?: boolean
	handleIteration: () => void
	totalNumber: number
}

export default function Recipes({
	recipes,
	variant,
	handleIteration,
	totalNumber
}: RecipesProps) {
	return (
		<>
			<Title className={`text-center ${variant ? '' : 'pt-40'} pb-20 px-2`}>
				{variant
					? recipes.length > 0
						? `Showing ${recipes.length} (/${totalNumber}) recipe${
								recipes.length > 1 ? 's' : ''
							} that fit${recipes.length > 1 ? '' : 's'} the parameters`
						: ''
					: 'Your published recipes'}
			</Title>

			<div
				className={`grid ${
					recipes.length >= 1
						? 'xl:grid-cols-3 md:grid-cols-2 grid-cols-1'
						: 'grid-cols-1'
				} px-10 lg:px-40 gap-16 w-full`}
			>
				{recipes && recipes.length >= 1 ? (
					<>
						{recipes.map((recipe: Data) => {
							return (
								<RecipeCard
									image={recipe.imageUrl}
									tags={recipe.labels.map(label => {
										const data = filterIconCoincidence('categories', label)
										return data as Tag
									})}
									title={recipe.title}
									type={recipe.tag}
									id={recipe._id}
									key={recipe._id}
									likes={recipe.likeCount}
									variant={variant}
									userIdDB={recipe.user._id}
									userName={recipe.user.name}
									rating={recipe.rating}
								/>
							)
						})}
						{totalNumber > recipes.length && (
							<MoreResultsButton handleIteration={handleIteration} />
						)}
					</>
				) : (
					<Title order={2} className='text-center w-full' c='dark'>
						{variant ? (
							<span>Oops! There is no recipe that fits the criteria</span>
						) : (
							<span>
								Oops! Seems like you haven&apos;t yet published anything. Why
								not start by{' '}
								<Link
									href={'/create'}
									className='underline hover:text-gray-700 transition-all'
								>
									publishing your first recipe?
								</Link>
							</span>
						)}
					</Title>
				)}
			</div>
		</>
	)
}
