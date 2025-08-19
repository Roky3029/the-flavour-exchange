'use client'

import { Burger, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MantineLogo } from '@mantinex/mantine-logo'
import classes from './../styles/HeaderMenu.module.css'
import { ActionToggle } from './ThemeButton'
import Link from 'next/link'

const links = [
	{ link: '/auth/signup', label: 'Sign Up' },
	{ link: '/auth/login', label: 'Log In' }
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

export function Navbar() {
	const [opened, { toggle }] = useDisclosure(false)

	const items = links.map(link => {
		return (
			<Link
				key={link.label}
				href={link.link}
				className={classes.link}
				// onClick={event => event.preventDefault()}
			>
				{link.label}
			</Link>
		)
	})

	return (
		<header className={classes.header}>
			<Container size='md'>
				<div className={classes.inner}>
					<MantineLogo size={28} />
					<Group gap={5} visibleFrom='sm'>
						{items}
					</Group>
					<ActionToggle />
					<Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
				</div>
			</Container>
		</header>
	)
}
