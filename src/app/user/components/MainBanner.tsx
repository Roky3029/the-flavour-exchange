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
import ModalEls from './ModalHandler'
import { useDisclosure } from '@mantine/hooks'
import ModalHandler from './ModalHandler'

interface MainBannerProps {
	name: string
	following: number
	followers: number
}

export default function MainBanner({
	name,
	following,
	followers
}: MainBannerProps) {
	const [opened, { open, close }] = useDisclosure()
	const [opened2, { open: open2, close: close2 }] = useDisclosure()

	return (
		<>
			<ModalHandler
				opened={opened}
				close={close}
				title='People that follow you'
				variant='follow'
			/>
			<ModalHandler
				opened={opened2}
				close={close2}
				title='People you are following'
				variant='following'
			/>
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
							<Link href={'/timeline'}>
								<Button radius='xl' color='#05a8b7'>
									Explore your timeline
								</Button>
							</Link>
						</GridCol>
					</Grid>
					<div className='text-center text-2xl cursor-pointer' onClick={open}>
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
					<div className='text-center text-2xl cursor-pointer' onClick={open2}>
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
				</SimpleGrid>
			</Container>
		</>
	)
}
