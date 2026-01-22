import { Navbar } from '@/components/Navbar'
import { Title } from '@mantine/core'
import Link from 'next/link'

export default function NotFoundPage() {
	return (
		<div className='w-full flex items-center justify-center flex-col'>
			<Navbar />

			<Title order={2} className='text-center w-full pt-40' c='dark'>
				<span>
					Oops! Seems we can&apos;t find what you are looking for. Why not try
					and{' '}
					<Link
						href={'/user'}
						className='underline hover:text-gray-700 transition-all'
					>
						go to your profile?
					</Link>
				</span>
			</Title>
		</div>
	)
}
