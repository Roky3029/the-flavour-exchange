import {
	Badge,
	Button,
	Card,
	CardSection,
	Group,
	Image,
	Text
} from '@mantine/core'
import classes from './../styles/BadgeCard.module.css'
import { Rating } from '@mantine/core'
import { SplitButton } from './forms/buttons/SplitButton'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import Link from 'next/link'
import LikeButton from './LikeButton'
import { Rating as RatingType } from '@/models/Recipe'
import { calculateRating } from '@/utils/calculateRating'
import { BoringAvatar } from './BoringAvatar'

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
	userIdDB: string
	userName: string
	rating: RatingType[]
	variant?: boolean
}

export function RecipeCard({
	image,
	title,
	type,
	tags,
	id,
	likes,
	variant,
	userIdDB,
	rating,
	userName
}: RecipeCardProps) {
	const features = tags.map((tag, i) => (
		<Badge variant='light' key={i} leftSection={tag.icon}>
			{tag.name}
		</Badge>
	))

	const tag = filterIconCoincidence('types', type)

	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<CardSection>
				<div className='h-50 md:h-75 overflow-hidden'>
					<Image src={image} alt={title} height={180} fit='cover' />
				</div>
			</CardSection>

			<CardSection className={classes.section} mt='md'>
				<div className='flex justify-center gap-4 flex-col'>
					<div className='w-full flex items-center justify-between gap-3'>
						<Text fz='lg' fw={500} className='text-start'>
							{title}
						</Text>

						{variant ? (
							<div className='flex items-center justify-end gap-3 border-[1] border-amber-100 w-fit px-1 py-1 lg:px-4 lg:py-2 rounded-lg'>
								<BoringAvatar name={userName} size={30} />
								<Text fz='sm' fw={500}>
									{userName}
								</Text>
							</div>
						) : (
							<></>
						)}
					</div>
					<div className='flex items-center justify-between w-full'>
						<Badge size='sm' variant='light' leftSection={tag?.icon}>
							{tag?.name}
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
					{variant ? 'Perfect for you, if you enjoy' : 'Selected tags'}
				</Text>
				<Group gap={7} mt={5}>
					{features}
				</Group>
			</CardSection>

			<Group mt={'xs'}>
				{variant ? (
					<Button component={Link} href={`/recipes/${id}`} flex={4}>
						Show details
					</Button>
				) : (
					<SplitButton id={id} />
				)}
				<LikeButton
					likeCount={likes}
					userWhoCreatedTheRecipe={userIdDB}
					recipeId={id}
				/>
			</Group>
		</Card>
	)
}
