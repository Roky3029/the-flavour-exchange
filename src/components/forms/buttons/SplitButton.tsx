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

interface SplitButtonProps {
	id: string
}

export function SplitButton({ id }: SplitButtonProps) {
	const theme = useMantineTheme()

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
					<MenuItem
						leftSection={
							<IconTrash size={16} stroke={1.5} color={theme.colors.red[5]} />
						}
					>
						Delete
					</MenuItem>
				</MenuDropdown>
			</Menu>
		</Group>
	)
}
