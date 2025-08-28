'use client'

import { BoringAvatar } from '@/components/BoringAvatar'
import { Navbar } from '@/components/Navbar'
import { RecipeCard, Tag } from '@/components/RecipeCard'
import { CATEGORIES_ICONS } from '@/data/FoodIcons'
import useGetRecipes from '@/hooks/useGetRecipes'
import { useSession } from '@/hooks/useSession'
import { Data } from '@/types/recipe'
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

export default function User() {
	const session = useSession()

	const recipes = useGetRecipes(session?.user.id)

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
								const data = CATEGORIES_ICONS.find(cat => cat.id === label)
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
		</div>
	)
}
