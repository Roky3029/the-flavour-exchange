import {
	IconChevronRight,
	IconStarFilled,
	IconUserHexagon
} from '@tabler/icons-react'
import {
	Group,
	Text,
	UnstyledButton,
	Menu,
	useMantineTheme
} from '@mantine/core'
import classes from './../styles/UserButton.module.css'
import { Response } from '@/types/session'
import { IconLogout } from '@tabler/icons-react'
import { signOut } from '@/methods/user/signOut'
import { useRouter } from 'next/navigation'
import { showNotification } from '@/utils/showNotification'
import { notifications } from '@mantine/notifications'
import Link from 'next/link'
import { BoringAvatar } from './BoringAvatar'

interface UserProfileNavbarInterface {
	session: Response | null
}

export function UserButton({ session }: UserProfileNavbarInterface) {
	const theme = useMantineTheme()
	const router = useRouter()

	const handleSignOut = async () => {
		const id = showNotification(
			'We are processing your request!',
			'Please wait while we resolve it',
			4000,
			'green',
			() => {},
			true
		)
		const { data, error } = await signOut()

		if (data?.success && !error) {
			notifications.update({
				id,
				title: 'Sign out successful',
				message: 'You will now be redirected to login',
				autoClose: 4000,
				color: 'cyan',
				onClose: () => router.push('/auth/login')
			})
		} else {
			notifications.update({
				id,
				title: 'There was an error signing you out',
				message: 'Please try again later',
				autoClose: 4000,
				color: 'red'
			})
		}
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
						{/* <Avatar src={session?.user.image} radius='xl' /> */}
						<BoringAvatar name={session!.user.name} />
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
				<Link href={'/user'}>
					<Menu.Item
						leftSection={
							<IconUserHexagon
								size={16}
								color={theme.colors.teal[6]}
								stroke={1.5}
							/>
						}
					>
						Profile
					</Menu.Item>
				</Link>
				<Link href={'/liked'}>
					<Menu.Item
						leftSection={
							<IconStarFilled
								size={16}
								color={theme.colors.yellow[6]}
								stroke={1.5}
							/>
						}
					>
						Liked recipes
					</Menu.Item>
				</Link>
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
