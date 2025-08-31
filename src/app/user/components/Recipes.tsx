'use client'

import { RecipeCard, Tag } from '@/components/RecipeCard'
import { Data } from '@/types/recipe'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import { Title } from '@mantine/core'
import Link from 'next/link'

interface RecipesProps {
	recipes: Data[]
}

export default function Recipes({ recipes }: RecipesProps) {
	return (
		<>
			<Title className='text-center pt-40 pb-20'>Your published recipes</Title>

			<div
				className={`grid ${
					recipes.length >= 1
						? 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
						: 'grid-cols-1'
				} px-40 gap-16`}
			>
				{recipes && recipes.length >= 1 ? (
					recipes.map((recipe: Data) => (
						<RecipeCard
							image={recipe.imageUrl}
							tags={recipe.labels.map(label => {
								const data = filterIconCoincidence('categories', label)
								return data as Tag
							})}
							title={recipe.title}
							type={recipe.tag}
							key={recipe._id}
							id={recipe._id}
							likes={recipe.likeCount}
						/>
					))
				) : (
					<Title order={2} className='text-center w-full' c='dark'>
						Oops! Seems like you haven&apos;t yet published anything. Why not
						start by{' '}
						<Link
							href={'/create'}
							className='underline hover:text-gray-700 transition-all'
						>
							publishing your first recipe?
						</Link>
					</Title>
				)}
			</div>
		</>
	)
}
