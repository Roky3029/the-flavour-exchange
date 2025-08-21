'use client'

import { Burger, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './../styles/HeaderMenu.module.css'
import { ActionToggle } from './ThemeButton'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from './UserProfileNavbar'
import { useEffect, useState } from 'react'
import { Response } from '@/types/session'

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

export function Navbar() {
	const [opened, { toggle }] = useDisclosure(false)
	const [session, setSession] = useState<Response | null>(null)

	useEffect(() => {
		fetch('/api/session')
			.then(res => res.json())
			.then(setSession)
	}, [])

	const items = links.map(link => {
		return (
			<Link key={link.label} href={link.link} className={classes.link}>
				{link.label}
			</Link>
		)
	})

	return (
		<header className={classes.header}>
			<Container size='md'>
				<div className={classes.inner}>
					<Image src='/logo.png' alt='Logo' width={40} height={40} />
					<Group gap={5} visibleFrom='sm'>
						{items}
					</Group>

					{session && <UserButton session={session} />}
					<ActionToggle />
					<Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
				</div>
			</Container>
		</header>
	)
}
