'use client'

import {
	Burger,
	Button,
	Container,
	Group,
	Modal,
	useMantineTheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './../styles/HeaderMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from './UserProfileNavbar'
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation'
import ModalNavbar from './ModalNavbar'

const links = [
	{ link: '/auth/signup', label: 'Sign Up' },
	{ link: '/auth/login', label: 'Log In' }
]

interface NavbarProps {
	wantMarginBottom?: boolean
}

export function Navbar({ wantMarginBottom }: NavbarProps) {
	const [opened, { toggle }] = useDisclosure(false)
	const session = useSession()
	const theme = useMantineTheme()
	const router = useRouter()
	let isMobile = false

	if (typeof window !== 'undefined') {
		isMobile = window ? window.matchMedia('(max-width: 600px)').matches : false
	}

	const items = links.map(link => {
		return (
			<Link key={link.label} href={link.link} className={classes.link}>
				{link.label}
			</Link>
		)
	})

	return (
		<header
			className={`${classes.header} ${wantMarginBottom ? `${classes.mb}` : ''}`}
		>
			<ModalNavbar
				items={items}
				opened={opened}
				router={router}
				session={session}
				theme={theme}
				toggle={toggle}
			/>

			<Container size='md'>
				<div className={classes.inner}>
					<Link href='/'>
						<Image
							src='/logo.png'
							alt='Logo'
							width={40}
							height={40}
							className='w-auto h-auto'
						/>
					</Link>
					{!session && (
						<Group gap={5} visibleFrom='sm'>
							{items}
						</Group>
					)}

					{session && <UserButton session={session} doNotShowText={isMobile} />}
					<Button
						variant='outline'
						onClick={() => router.push('/recipes')}
						color={theme.colors.green[3]}
						visibleFrom='sm'
					>
						Search recipes
					</Button>
					<Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
				</div>
			</Container>
		</header>
	)
}
