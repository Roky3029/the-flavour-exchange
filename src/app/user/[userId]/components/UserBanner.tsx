'use client'

import { BoringAvatar } from '@/components/BoringAvatar'
import FollowButton from '@/components/FollowButton'
import { Container, Text, Title } from '@mantine/core'

interface MainBannerProps {
	name: string
	id: string
	following: number
	followers: number
}

export default function UserBanner({
	name,
	id,
	following,
	followers
}: MainBannerProps) {
	return (
		<Container my='md'>
			<section className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20'>
				<BoringAvatar name={name} size={200} />
				<div className='flex justify-around flex-col gap-5'>
					<Title className='text-center'>{name}</Title>
					<FollowButton userId={id} />
				</div>

				<div className='text-center text-2xl'>
					<Text
						component='span'
						inherit
						variant='gradient'
						gradient={{ from: 'green', to: 'yellow' }}
					>
						{followers}
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
						{following}
					</Text>{' '}
					following
				</div>
			</section>
		</Container>
	)
}
