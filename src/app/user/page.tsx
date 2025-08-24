'use client'

import { BoringAvatar } from '@/components/BoringAvatar'
import { Navbar } from '@/components/Navbar'
import { RecipeCard, RecipeCardProps } from '@/components/RecipeCard'
import { useSession } from '@/utils/useSession'
import {
	Button,
	Container,
	Grid,
	GridCol,
	SimpleGrid,
	Text,
	Title
} from '@mantine/core'
import Link from 'next/link'

const mockRecipes: RecipeCardProps[] = [
	{
		image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
		title: 'Pancakes with caramel sauce and strawberries',
		type: 'Dessert',
		tags: [
			{ emoji: '🍰', label: 'Dessert' },
			{ emoji: '🥛', label: 'Lactose free' },
			{ emoji: '📉', label: 'LEHR' },
			{ emoji: '👶🏻', label: '10-99 age' }
		]
	},
	{
		image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
		title: 'Açai bowl with forest fruits, almonds and tropical fruits',
		type: 'Snack',
		tags: [
			{ emoji: '🍟', label: 'Snack' },
			{ emoji: '🥛', label: 'Lactose free' },
			{ emoji: '📉', label: 'LEHR' },
			{ emoji: '👶🏻', label: '10-99 age' }
		]
	},
	{
		image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
		title: 'Spaguetti alla matricciana NEO',
		type: 'Dish',
		tags: [
			{ emoji: '🍰', label: 'Dessert' },
			{ emoji: '🥛', label: 'Lactose free' },
			{ emoji: '📉', label: 'LEHR' },
			{ emoji: '👶🏻', label: '10-99 age' }
		]
	},
	{
		image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
		title: 'Spaguetti alla matricciana 2',
		type: 'Dish',
		tags: [
			{ emoji: '🍰', label: 'Dessert' },
			{ emoji: '🥛', label: 'Lactose free' },
			{ emoji: '📉', label: 'LEHR' },
			{ emoji: '👶🏻', label: '10-99 age' }
		]
	},
	{
		image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
		title: 'Spaguetti alla matricciana 3',
		type: 'Dish',
		tags: [
			{ emoji: '🍰', label: 'Dessert' },
			{ emoji: '🥛', label: 'Lactose free' },
			{ emoji: '📉', label: 'LEHR' },
			{ emoji: '👶🏻', label: '10-99 age' }
		]
	}
]

export default function User() {
	const session = useSession()
	console.log(session)

	return (
		<div>
			<Navbar wantMarginBottom />

			<Container my='md'>
				<SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
					<BoringAvatar name={session?.user.name} size={200} />
					<Grid gutter='md'>
						<GridCol>
							<Title>
								Welcome {session?.user.name}. What are we feeling today?
							</Title>
						</GridCol>
						<GridCol span={6}>
							<Link href={'/create'}>
								<Button radius='xl' color='#15803d'>
									Publish a new recipe
								</Button>
							</Link>
						</GridCol>
						<GridCol span={6}>
							<Link href={'/create'}>
								<Button radius='xl' color='#05a8b7'>
									Explore your timeline
								</Button>
							</Link>
						</GridCol>
					</Grid>
					<div className='text-center text-2xl'>
						<Text
							component='span'
							inherit
							variant='gradient'
							gradient={{ from: 'green', to: 'yellow' }}
						>
							345
						</Text>{' '}
						followers
					</div>
					<div className='text-center text-2xl'>
						<Text
							component='span'
							inherit
							variant='gradient'
							gradient={{ from: 'green', to: 'yellow' }}
						>
							3
						</Text>{' '}
						following
					</div>
				</SimpleGrid>
			</Container>

			<Title className='text-center pt-40 pb-20'>Your published recipes</Title>

			<div
				className={`grid ${
					mockRecipes.length >= 1 ? 'grid-cols-3' : 'grid-cols-1'
				} px-40 gap-16`}
			>
				{mockRecipes.length >= 1 ? (
					mockRecipes.map(recipe => (
						<RecipeCard
							image={recipe.image}
							tags={recipe.tags}
							title={recipe.title}
							type={recipe.type}
							key={recipe.title}
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
		</div>
	)
}
