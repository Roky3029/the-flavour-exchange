import { Card, CardSection, Image, Text, Title } from '@mantine/core'
import classes from '@/styles/BadgeCard.module.css'

interface FeatureCardProps {
	src: string
	title: string
	description: string
}

export default function FeatureCard({
	src,
	title,
	description
}: FeatureCardProps) {
	return (
		<Card withBorder radius='md' p='md' className={classes.card}>
			<CardSection>
				<div className='h-25 md:h-50 xl:h-75 overflow-hidden'>
					<Image
						src={src}
						alt={'Image of the feature'}
						height={180}
						fit='cover'
					/>
				</div>
			</CardSection>

			<CardSection className={classes.section} mt='md'>
				<Title order={4}>{title}</Title>
			</CardSection>

			<CardSection className={classes.section} mt='md'>
				<Text>{description}</Text>
			</CardSection>
		</Card>
	)
}
