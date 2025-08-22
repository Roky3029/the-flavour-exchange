import { IconHeart } from '@tabler/icons-react'
import {
	ActionIcon,
	Badge,
	Button,
	Card,
	Group,
	Image,
	Text
} from '@mantine/core'
import classes from './../styles/BadgeCard.module.css'

interface Tag {
	emoji: string
	label: string
}

export interface RecipeCardProps {
	image: string
	title: string
	// TODO: add that the only possible options are Entree, dessert, sauce, etc
	type: string
	tags: Tag[]
}

export function RecipeCard({ image, title, type, tags }: RecipeCardProps) {
	const features = tags.map(tag => (
		<Badge variant='light' key={tag.label} leftSection={tag.emoji}>
			{tag.label}
		</Badge>
	))

	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<Card.Section>
				<div className='h-[300px] overflow-hidden'>
					<Image src={image} alt={title} height={180} fit='cover' />
				</div>
			</Card.Section>

			<Card.Section className={classes.section} mt='md'>
				<div>
					<Text fz='lg' fw={500}>
						{title}
					</Text>
					<Badge size='sm' variant='light'>
						{type}
					</Badge>
				</div>
				{/* <Text fz='sm' mt='xs'>
					{description}
				</Text> */}
			</Card.Section>

			<Card.Section className={classes.section}>
				<Text mt='md' className={classes.label} c='dimmed'>
					Perfect for you, if you enjoy
				</Text>
				<Group gap={7} mt={5}>
					{features}
				</Group>
			</Card.Section>

			<Group mt='xs'>
				<Button radius='md' style={{ flex: 1 }}>
					Show details
				</Button>
				<ActionIcon variant='default' radius='md' size={36}>
					<IconHeart className={classes.like} stroke={1.5} />
				</ActionIcon>
			</Group>
		</Card>
	)
}
