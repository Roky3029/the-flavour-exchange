import { IconHeart } from '@tabler/icons-react'
import {
	ActionIcon,
	Badge,
	Button,
	Card,
	CardSection,
	Group,
	Image,
	Text
} from '@mantine/core'
import classes from './../styles/BadgeCard.module.css'
import Link from 'next/link'
import { Rating, ThinRoundedStar } from '@smastrom/react-rating'

export interface Tag {
	icon: string
	name: string
	id: string
}

export interface RecipeCardProps {
	image: string
	title: string
	// TODO: add that the only possible options are Entree, dessert, sauce, etc
	type: string
	tags: Tag[]
	id: string
	likes: number
}

export function RecipeCard({
	image,
	title,
	type,
	tags,
	id,
	likes
}: RecipeCardProps) {
	const features = tags.map(tag => (
		<Badge variant='light' key={tag.id} leftSection={tag.icon}>
			{tag.name}
		</Badge>
	))

	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<CardSection>
				<div className='h-[100px] md:h-[200px] xl:h-[300px] overflow-hidden'>
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
							value={3}
							readOnly
							itemStyles={{
								itemShapes: ThinRoundedStar,
								activeFillColor: '#f59e0b',
								inactiveFillColor: '#7a4e06'
							}}
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
				<Link href={`/recipes/${id}`} className='flex-4 w-full'>
					<Button radius='md' style={{ flex: 1, width: '100%' }}>
						Show details
					</Button>
				</Link>
				<ActionIcon
					component='div'
					variant='default'
					radius='md'
					size={36}
					flex={1}
					// disabled
					className={classes.disabled}
				>
					<IconHeart className={classes.like} stroke={1.5} />
					<Text
						inherit
						variant='gradient'
						gradient={{ from: 'green', to: 'yellow' }}
						size='lg'
					>
						{likes}
					</Text>
				</ActionIcon>
			</Group>
		</Card>
	)
}
