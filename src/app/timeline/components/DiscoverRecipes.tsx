'use client'

import { AnotherUserRecipeCard } from '@/app/user/[userId]/components/AnotherUserRecipeCard'
import { Tag } from '@/components/RecipeCard'
import { Data } from '@/types/recipe'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import { Title } from '@mantine/core'

interface DiscoverRecipesInterface {
	mostRecentRecipes: Data[]
}

export default function DiscoverRecipes({
	mostRecentRecipes
}: DiscoverRecipesInterface) {
	return (
		<>
			<Title
				className='pt-20 text-center'
				order={2}
				c={mostRecentRecipes.length == 0 ? 'dark' : ''}
			>
				{mostRecentRecipes.length > 0
					? 'Wanna get new inspiration? Check out these recipes'
					: 'This place is kinda empty without people publishing...'}
			</Title>

			<div className='w-full px-40 grid grid-cols-3 gap-10 py-10'>
				{mostRecentRecipes.map((recipe, i) => (
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
