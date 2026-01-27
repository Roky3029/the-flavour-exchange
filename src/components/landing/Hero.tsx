'use client'

import { Button, Container, Text, Title } from '@mantine/core'
import classes from '@/styles/HeroImageRight.module.css'
import { useRouter } from 'next/navigation'

export default function HeroImageRight() {
	const router = useRouter()

	return (
		<div className={classes.root}>
			<Container size='lg'>
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title}>
							The{' '}
							<Text
								component='span'
								inherit
								variant='gradient'
								gradient={{ from: 'green', to: 'yellow' }}
							>
								Flavour Exchange
							</Text>{' '}
						</Title>

						<Text className={classes.description} mt={30}>
							The social media to share your best recipes so that everyone can
							enjoy a fancy dish in the comfort of their own kitchen. Get
							inspiration, replicate a popular dish, create your very own, all
							of that can be made here, in The Flavour Exchange.
						</Text>

						<Button
							variant='gradient'
							gradient={{ from: 'green', to: 'yellow' }}
							size='xl'
							className={classes.control}
							mt={40}
							onClick={() => router.push('/auth/login')}
						>
							Get started
						</Button>
					</div>
				</div>
			</Container>
		</div>
	)
}
