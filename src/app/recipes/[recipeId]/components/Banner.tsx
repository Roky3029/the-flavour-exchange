'use client'

import { BoringAvatar } from '@/components/BoringAvatar'
import { CATEGORIES_ICONS, TYPES_OF_FOOD_ICONS } from '@/data/FoodIcons'
import { formatMinutes } from '@/utils/formatMinutes'
import { ActionIcon, Badge, Image, Text, Title } from '@mantine/core'
import { ThinRoundedStar, Rating } from '@smastrom/react-rating'
import { IconHeart } from '@tabler/icons-react'
import Link from 'next/link'

interface BannerProps {
	imageUrl: string
	title: string
	likeCount: number
	etc: number
	tag: string
	rating: number
	labels: string[]
	userName: string
	userId: string
	date: string
	sessionId: string
}

export default function Banner({
	imageUrl,
	title,
	likeCount,
	etc,
	tag,
	rating,
	labels,
	userName,
	userId,
	date,
	sessionId
}: BannerProps) {
	const mainTagWithIcon = TYPES_OF_FOOD_ICONS.find(el => el.id === tag)
	const labelsWithIcon = labels.map(l =>
		CATEGORIES_ICONS.find(el => el.id === l)
	)

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	}

	const formattedDate = new Date(date).toLocaleDateString('en-GB', options)

	return (
		<section className='grid grid-cols-1 lg:grid-cols-2 place-content-center px-16'>
			<Image alt={title} src={imageUrl} radius='lg' />

			<section className='flex items-center justify-center flex-col gap-20'>
				<div className='flex items-center justify-between w-[60%]'>
					<Title>{title}</Title>
					<ActionIcon
						component='div'
						variant='default'
						radius='md'
						size={36}
						className='pointer-events-none'
						w='10%'
					>
						<IconHeart className='text-red-500 w-5 h-5 mr-2.5' stroke={1.5} />
						<Text
							inherit
							variant='gradient'
							gradient={{ from: 'green', to: 'yellow' }}
							size='lg'
						>
							{likeCount}
						</Text>
					</ActionIcon>
				</div>
				<div className='flex items-center justify-between gap-10'>
					<Text>ETC: {formatMinutes(etc)}</Text>
					<Badge variant='filled' leftSection={mainTagWithIcon?.icon}>
						{mainTagWithIcon?.name}
					</Badge>

					<Rating
						style={{ maxWidth: 200 }}
						value={rating}
						readOnly={sessionId === userId}
						itemStyles={{
							itemShapes: ThinRoundedStar,
							activeFillColor: '#f59e0b',
							inactiveFillColor: '#7a4e06'
						}}
					/>
				</div>
				<div className='flex items-center justify-center gap-10'>
					{labelsWithIcon.map(label => (
						<Badge
							variant='outline'
							key={label?.id}
							leftSection={label?.icon}
							size='lg'
						>
							{label?.name}
						</Badge>
					))}
				</div>
				<div className='flex items-center justify-center gap-20'>
					<Link
						href={`/user/${userId}`}
						className='flex items-center justify-center gap-3 border-2 border-[#383838] px-5 py-3 rounded-lg transition-all hover:bg-[#383838]'
					>
						<BoringAvatar name={userName} />
						<Text fw={700}>{userName}</Text>
					</Link>
					<Text>{formattedDate}</Text>
				</div>
			</section>
		</section>
	)
}
