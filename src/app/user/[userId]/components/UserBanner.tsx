'use client'

import { BoringAvatar } from '@/components/BoringAvatar'
import {
	Button,
	Container,
	Grid,
	GridCol,
	SimpleGrid,
	Text,
	Title
} from '@mantine/core'

interface MainBannerProps {
	name: string
}

export default function UserBanner({ name }: MainBannerProps) {
	return (
		<Container my='md'>
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
				<BoringAvatar name={name} size={200} />
				<Grid gutter='md'>
					<GridCol>
						<Title>{name}</Title>
					</GridCol>
					<GridCol span={12}>
						<Button radius='xl' color='#15803d'>
							Follow {/* TODO: do the follow functionality */}
						</Button>
					</GridCol>

					<GridCol span={6} className='text-center text-2xl'>
						<Text
							component='span'
							inherit
							variant='gradient'
							gradient={{ from: 'green', to: 'yellow' }}
						>
							345
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
							3
						</Text>{' '}
						following
					</GridCol>
				</Grid>
			</SimpleGrid>
		</Container>
	)
}
