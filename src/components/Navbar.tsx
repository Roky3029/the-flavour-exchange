'use client'

import {
	Burger,
	Button,
	Container,
	Group,
	useMantineTheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './../styles/HeaderMenu.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from './UserProfileNavbar'
import { useSession } from '@/hooks/useSession'

const links = [
	{ link: '/auth/signup', label: 'Sign Up' },
	{ link: '/auth/login', label: 'Log In' }
	// { link: '/auth/logout', label: 'Log Out' }
	// {
	// 	link: '#2',
	// 	label: 'Support',
	// 	links: [
	// 		{ link: '/faq', label: 'FAQ' },
	// 		{ link: '/demo', label: 'Book a demo' },
	// 		{ link: '/forums', label: 'Forums' }
	// 	]
	// }
]

interface NavbarProps {
	wantMarginBottom?: boolean
}

export function Navbar({ wantMarginBottom }: NavbarProps) {
	const [opened, { toggle }] = useDisclosure(false)
	const session = useSession()
	const theme = useMantineTheme()

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
			<Container size='md'>
				<div className={classes.inner}>
					<Link href='/'>
						<Image src='/logo.png' alt='Logo' width={40} height={40} />
					</Link>
					{!session && (
						<Group gap={5} visibleFrom='sm'>
							{items}
						</Group>
					)}

					{session && <UserButton session={session} />}
					<Button
						variant='outline'
						component={Link}
						href={'/recipes'}
						color={theme.colors.green[3]}
					>
						Search recipes
					</Button>
					<Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
				</div>
			</Container>
		</header>
	)
}
