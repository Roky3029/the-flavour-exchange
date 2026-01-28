'use client'

import { useSession } from '@/hooks/useSession'
import { getFollowers } from '@/methods/misc/getFollowers'
import { getFollowing } from '@/methods/misc/getFollowing'
import { User } from '@/types/user'
import { Modal } from '@mantine/core'
import { useEffect, useState, useTransition } from 'react'
import UserEntry from './UserEntry'

interface ModalHandlerProps {
	opened: boolean
	close: () => void
	title: string
	variant: 'follow' | 'following'
}

export default function ModalHandler({
	opened,
	close,
	title,
	variant
}: ModalHandlerProps) {
	const session = useSession()
	const [isPending, startTransition] = useTransition()
	const [data, setData] = useState<User[]>()

	useEffect(() => {
		startTransition(async () => {
			const users: User[] =
				variant === 'follow'
					? await getFollowers(session?.user.id)
					: await getFollowing(session?.user.id)
			setData(users)
		})
	}, [session])

	return (
		<Modal
			opened={opened}
			onClose={close}
			title={title}
			centered
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3
			}}
		>
			{data && data.length > 0 ? (
				<div className='flex flex-col items-center justify-center gap-2'>
					{data.map(d => (
						<UserEntry name={d.name} userId={d._id} />
					))}
				</div>
			) : (
				<p>There are no users... :(</p>
			)}
		</Modal>
	)
}
