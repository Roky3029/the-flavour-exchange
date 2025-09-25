'use client'

import { BoringAvatar } from '@/components/BoringAvatar'
import FollowButton from '@/components/FollowButton'
import {
	Container,
	Grid,
	GridCol,
	SimpleGrid,
	Text,
	Title
} from '@mantine/core'

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
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
				<BoringAvatar name={name} size={200} />
				<Grid gutter='md'>
					<GridCol>
						<Title>{name}</Title>
					</GridCol>
					<GridCol span={12}>
						<FollowButton userId={id} />
					</GridCol>

					<GridCol span={6} className='text-center text-2xl'>
						<Text
							component='span'
							inherit
							variant='gradient'
							gradient={{ from: 'green', to: 'yellow' }}
						>
							{followers}
						</Text>{' '}
						followers
					</GridCol>
					<GridCol span={6} className='text-center text-2xl'>
						<Text
							component='span'
							inherit
							variant='gradient'
							gradient={{ from: 'green', to: 'yellow' }}
						>
							{following}
						</Text>{' '}
						following
					</GridCol>
				</Grid>
			</SimpleGrid>
		</Container>
	)
}
