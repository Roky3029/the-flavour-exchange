import { IconChevronRight } from '@tabler/icons-react'
import {
	Avatar,
	Group,
	Text,
	UnstyledButton,
	Menu,
	useMantineTheme
} from '@mantine/core'
import classes from './../styles/UserButton.module.css'
import { Response } from '@/types/session'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from '@/utils/signOut'
import { useRouter } from 'next/navigation'
import { showNotification } from '@/utils/showNotification'

interface UserProfileNavbarInterface {
	session: Response | null
}

export function UserButton({ session }: UserProfileNavbarInterface) {
	const theme = useMantineTheme()
	const router = useRouter()

	const handleSignOut = async () => {
		await signOut()

		showNotification(
			'Sign out successful',
			'You will now be redirected to login',
			4000,
			'cyan',
			() => router.push('/auth/login')
		)
	}

	return (
		<Menu
			transitionProps={{ transition: 'pop-top-right' }}
			position='bottom-end'
			width={220}
			withinPortal
			radius='md'
		>
			<Menu.Target>
				<UnstyledButton className={classes.user}>
					<Group>
						<Avatar src={session?.user.image} radius='xl' />

						<div style={{ flex: 1 }}>
							<Text size='sm' fw={500}>
								{session?.user.name}
							</Text>

							<Text c='dimmed' size='xs'>
								{session?.user.email}
							</Text>
						</div>

						<IconChevronRight size={14} stroke={1.5} />
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					leftSection={
						<IconLogout size={16} color={theme.colors.red[6]} stroke={1.5} />
					}
					onClick={handleSignOut}
				>
					Log out
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	)
}
