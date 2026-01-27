'use client'

import HeroImageRight from '@/components/landing/Hero'
import { Navbar } from '@/components/Navbar'
import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import AboutMe from '@/components/landing/AboutMe'
import { Button, Title } from '@mantine/core'
import classes from '@/styles/HeroImageRight.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	return (
		<>
			<Navbar />
			<HeroImageRight />

			<AboutMe />

			<Features />

			<div className='pb-30 w-full flex items-center justify-center gap-30'>
				<Button
					variant='gradient'
					gradient={{ from: 'green', to: 'yellow' }}
					size='xl'
					className={classes.control}
					// component={Link}
					// href={'/auth/login'}
					onClick={() => router.push('/auth/login')}
				>
					Sign in!
				</Button>
				<Title order={6} className='text-slate-500'>
					or, if you don&apos;t have an account...
				</Title>
				<Button
					variant='gradient'
					gradient={{ from: 'green', to: 'teal' }}
					size='md'
					className={classes.control}
					// component={Link}
					// href={'/auth/login'}
					onClick={() => router.push('/auth/signup')}
				>
					Sign up!
				</Button>
			</div>

			<Footer />
		</>
	)
}
