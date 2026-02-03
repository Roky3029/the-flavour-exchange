'use client'

import {
	Badge,
	Button,
	Card,
	CardSection,
	Group,
	Image,
	Text
} from '@mantine/core'
import classes from '@/styles/BadgeCard.module.css'
import { Rating } from '@mantine/core'
import Link from 'next/link'
import LikeButton from '@/components/LikeButton'
import { Rating as RatingType } from '@/models/Recipe'
import { calculateRating } from '@/utils/calculateRating'

export interface Tag {
	icon: string
	name: string
	id: string
}

export interface RecipeCardProps {
	image: string
	title: string
	type: string
	tags: Tag[]
	id: string
	likes: number
	creator: string
	rating: RatingType[]
}

export function AnotherUserRecipeCard({
	image,
	title,
	type,
	tags,
	id,
	likes,
	creator,
	rating
}: RecipeCardProps) {
	const features = tags.map(tag => (
		<Badge variant='light' key={tag.id} leftSection={tag.icon}>
			{tag.name}
		</Badge>
	))

	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<CardSection>
				<div className='h-50 md:h-75 overflow-hidden'>
					<Image src={image} alt={title} height={180} fit='cover' />
				</div>
			</CardSection>

			<CardSection className={classes.section} mt='md'>
				<div className='flex justify-center gap-4 flex-col'>
					<Text fz='lg' fw={500} className='text-start'>
						{title}
					</Text>
					<div className='flex items-center justify-between w-full'>
						<Badge size='sm' variant='light'>
							{type}
						</Badge>
						<Rating
							style={{ maxWidth: 100 }}
							value={calculateRating(rating)}
							readOnly
							fractions={2}
						/>
					</div>
				</div>
			</CardSection>

			<CardSection className={`${classes.section} mb-auto`}>
				<Text mt='md' className={classes.label} c='dimmed'>
					Perfect for you, if you enjoy
				</Text>
				<Group gap={7} mt={5}>
					{features}
				</Group>
			</CardSection>

			<Group mt={'xs'}>
				<Button component={Link} href={`/recipes/${id}`} flex={4}>
					Show details
				</Button>
				<LikeButton
					likeCount={likes}
					recipeId={id}
					userWhoCreatedTheRecipe={creator}
				/>
			</Group>
		</Card>
	)
}
