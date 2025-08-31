'use client'

import {
	ActionIcon,
	Button,
	Group,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuTarget,
	useMantineTheme
} from '@mantine/core'
import classes from '@/styles/SplitButton.module.css'
import { IconChevronDown, IconEdit, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { deleteRecipe } from '@/utils/deleteRecipe'
import { showNotification } from '@/utils/showNotification'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'

interface SplitButtonProps {
	id: string
}

export function SplitButton({ id }: SplitButtonProps) {
	const theme = useMantineTheme()
	const router = useRouter()

	const handleSubmit = async () => {
		const notificationId = showNotification(
			'Trying to delete your recipe',
			'Please wait while we try to delete it',
			3000,
			'orange',
			() => {},
			false
		)
		const result = await deleteRecipe(id)

		if (result.success && result.code === 200) {
			notifications.update({
				id: notificationId,
				title: 'Recipe deleted successfully!',
				message: 'Hope you continue publishing delicious recipes!',
				autoClose: 5000,
				color: 'red',
				onClose: () => router.push(`/user`),
				loading: false
			})
		} else {
			notifications.update({
				id,
				title: 'Oops, something went wrong trying to delete the recipe!',
				message: 'Please try again later',
				autoClose: 5000,
				color: 'red',
				loading: false
			})
		}
	}

	return (
		<Group wrap='nowrap' gap={0} flex={4} className='w-full'>
			<Button
				component={Link}
				href={`/recipes/${id}`}
				className={`${classes.button} w-full`}
			>
				Show details
			</Button>
			<Menu
				transitionProps={{ transition: 'pop' }}
				position='bottom-end'
				withinPortal
				width={'10%'}
			>
				<MenuTarget>
					<ActionIcon
						variant='filled'
						color={theme.primaryColor}
						size={36}
						className={classes.menuControl}
					>
						<IconChevronDown size={16} stroke={1.5} />
					</ActionIcon>
				</MenuTarget>
				<MenuDropdown>
					<MenuItem
						component={Link}
						href={`/edit/${id}`}
						leftSection={
							<IconEdit size={16} stroke={1.5} color={theme.colors.blue[5]} />
						}
					>
						Edit
					</MenuItem>

					<form
						action={async () => {
							await handleSubmit()
						}}
					>
						<MenuItem
							leftSection={
								<IconTrash size={16} stroke={1.5} color={theme.colors.red[5]} />
							}
							component='button'
							type='submit'
						>
							Delete
						</MenuItem>
					</form>
				</MenuDropdown>
			</Menu>
		</Group>
	)
}
