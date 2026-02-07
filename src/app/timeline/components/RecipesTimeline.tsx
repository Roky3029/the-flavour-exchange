import { AnotherUserRecipeCard } from '@/app/user/[userId]/components/AnotherUserRecipeCard'
import { Tag } from '@/components/RecipeCard'
import { Data } from '@/types/recipe'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import { Title } from '@mantine/core'

interface RecipesTimelineInterface {
	variant: 'following' | 'discover'
	recipes: Data[]
}

export default function RecipesTimeline({
	variant,
	recipes
}: RecipesTimelineInterface) {
	return (
		<>
			<>
				<Title
					className='pt-20 text-center px-5'
					order={2}
					c={recipes.length == 0 ? 'dark' : ''}
				>
					{variant === 'following'
						? recipes.length > 0
							? 'Your followers have been cooking! Here are some new recipes they published'
							: 'Seems like there is nothing to show about your followers'
						: recipes.length > 0
							? 'Wanna get new inspiration? Check out these recipes'
							: 'This place is kinda empty without people publishing...'}
				</Title>

				<div
					className={`w-full px-5 lg:px-40 grid grid-cols-1 ${variant === 'following' ? 'lg:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'} gap-10 py-10`}
				>
					{recipes.map((recipe, i) => (
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
		</>
	)
}
