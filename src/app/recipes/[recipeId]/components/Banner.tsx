'use client'

import { BoringAvatar } from '@/components/BoringAvatar'
import LikeButton from '@/components/LikeButton'
import RatingStars from '@/components/RatingStars'
import { Rating } from '@/models/Recipe'
import { filterIconCoincidence } from '@/utils/filterIconCoincidence'
import { formatMinutes } from '@/utils/formatMinutes'
import { Badge, Text, Title } from '@mantine/core'
import Link from 'next/link'
import Image from 'next/image'

interface BannerProps {
	imageUrl: string
	title: string
	likeCount: number
	etc: number
	tag: string
	rating: Rating[]
	labels: string[]
	userName: string
	userId: string
	date: string
	sessionId: string
	recipeId: string
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
	sessionId,
	recipeId
}: BannerProps) {
	const mainTagWithIcon = filterIconCoincidence('types', tag)
	const labelsWithIcon = labels.map(l => filterIconCoincidence('categories', l))

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	}

	const formattedDate = new Date(date).toLocaleDateString('en-GB', options)

	return (
		<section className='grid grid-cols-1 lg:grid-cols-2 place-content-center px-5 lg:px-16 mt-10 w-full'>
			<section className='flex items-center justify-center w-full'>
				<Image alt={title} src={imageUrl} width={300} height={300} />
			</section>

			<section className='flex items-center justify-center flex-col gap-20 w-full'>
				<div className='flex items-center justify-center lg:justify-between flex-col lg:flex-row gap-3 w-[90%]'>
					<Title className='text-base! lg:text-3xl!'>{title}</Title>
					<LikeButton
						likeCount={likeCount}
						userWhoCreatedTheRecipe={userId}
						recipeId={recipeId}
					/>
				</div>
				<div className='flex items-center justify-between flex-col lg:flex-row gap-10'>
					<Text>ETC: {formatMinutes(etc)}</Text>
					<Badge variant='filled' leftSection={mainTagWithIcon?.icon}>
						{mainTagWithIcon?.name}
					</Badge>

					<RatingStars
						rating={rating}
						sessionId={sessionId}
						userId={userId}
						recipeId={recipeId}
					/>
				</div>
				<div className='grid place-content-center grid-cols-2 xl:grid-cols-5 gap-10'>
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
