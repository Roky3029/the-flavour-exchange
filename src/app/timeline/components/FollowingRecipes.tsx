'use client'

import { AnotherUserRecipeCard } from '@/app/user/[userId]/components/AnotherUserRecipeCard'
import { Tag } from '@/components/RecipeCard'
import { Data } from '@/types/recipe'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import { Title } from '@mantine/core'

interface FollowingRecipesInterface {
	recipesFromFollowers: Data[]
}

export default function FollowingRecipes({
	recipesFromFollowers
}: FollowingRecipesInterface) {
	return (
		<>
			<Title
				className='pt-20 text-center'
				order={2}
				c={recipesFromFollowers.length == 0 ? 'dark' : ''}
			>
				{recipesFromFollowers.length > 0
					? 'Your followers have been cooking! Here are some new recipes they published'
					: 'Seems like there is nothing to show about your followers'}
			</Title>

			<div className='w-full px-40 grid grid-cols-2 gap-10 py-10'>
				{recipesFromFollowers.map((recipe, i) => (
					<AnotherUserRecipeCard
						id={recipe._id}
						image={recipe.imageUrl}
						likes={recipe.likeCount}
						rating={recipe.rating}
						tags={recipe.labels.map(label => {
							const data = filterIconCoincidence('categories', label)
							return data as Tag
						})}
						title={recipe.title}
						type={recipe.tag}
						creator={recipe.user._id}
						key={i}
					/>
				))}
			</div>
		</>
	)
}
