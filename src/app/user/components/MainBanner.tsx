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
import Link from 'next/link'

interface MainBannerProps {
	name: string
}

export default function MainBanner({ name }: MainBannerProps) {
	return (
		<Container my='md'>
			<SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
				<BoringAvatar name={name} size={200} />
				<Grid gutter='md'>
					<GridCol>
						<Title>Welcome {name}. What are we feeling today?</Title>
					</GridCol>
					<GridCol span={6}>
						<Link href={'/create'}>
							<Button radius='xl' color='#15803d'>
								Publish a new recipe
							</Button>
						</Link>
					</GridCol>
					<GridCol span={6}>
						<Link href={'/create'}>
							<Button radius='xl' color='#05a8b7'>
								Explore your timeline
							</Button>
						</Link>
					</GridCol>
				</Grid>
				<div className='text-center text-2xl'>
					<Text
						component='span'
						inherit
						variant='gradient'
						gradient={{ from: 'green', to: 'yellow' }}
					>
						345
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
						3
					</Text>{' '}
					following
				</div>
			</SimpleGrid>
		</Container>
	)
}
