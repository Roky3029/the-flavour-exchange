'use client'

import { Tag } from '@/components/RecipeCard'
import { Data } from '@/types/recipe'
import { Title } from '@mantine/core'
import { AnotherUserRecipeCard } from './AnotherUserRecipeCard'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'

interface UserRecipesProps {
	username: string
	recipes: Data[] | undefined
}

export default function UserRecipes({ username, recipes }: UserRecipesProps) {
	return (
		<>
			<Title className='text-center pt-40 pb-20'>
				{username}&apos;s published recipes
			</Title>

			<div
				className={`grid ${
					recipes && recipes.length > 0
						? 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1'
						: 'grid-cols-1'
				} px-40 gap-16 w-full`}
			>
				{recipes && recipes.length >= 1 ? (
					recipes.map((recipe: Data) => (
						<AnotherUserRecipeCard
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
							creator={recipe.user._id}
							rating={recipe.rating}
						/>
					))
				) : (
					<Title order={2} className='text-center w-full' c='dark'>
						Oops! Seems like {username} has not published anything yet.
					</Title>
				)}
			</div>
		</>
	)
}
