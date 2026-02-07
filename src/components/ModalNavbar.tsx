import { Button, Group, MantineTheme, Modal } from '@mantine/core'
import { UserButton } from './UserProfileNavbar'
import Link from 'next/link'
import Image from 'next/image'
import { Response } from '@/types/session'
import { JSX } from 'react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface ModalNavbarInterface {
	opened: boolean
	toggle: () => void
	session: Response
	items: JSX.Element[]
	theme: MantineTheme
	router: AppRouterInstance
}

export default function ModalNavbar({
	opened,
	toggle,
	session,
	items,
	theme,
	router
}: ModalNavbarInterface) {
	return (
		<Modal opened={opened} onClose={toggle} fullScreen centered>
			<div className='w-full flex items-center justify-center flex-col gap-30'>
				{!session && <Group gap={5}>{items}</Group>}

				{session && <UserButton session={session} />}
				<Button
					variant='outline'
					onClick={() => router.push('/recipes')}
					color={theme.colors.green[3]}
				>
					Search recipes
				</Button>
				<Link href='/'>
					<Image
						src='/logo.png'
						alt='Logo'
						width={100}
						height={100}
						className='w-auto h-auto'
					/>
				</Link>
			</div>
		</Modal>
	)
}
