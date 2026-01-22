'use client'

import { useSession } from '@/hooks/useSession'
import { checkIfUserFollowsAnotherUser } from '@/methods/user/checkIfUserFollowsAnotherUser'
import { followUser, unfollowUser } from '@/methods/user/followActions'
import { Button } from '@mantine/core'
import { useEffect, useState, useTransition } from 'react'

interface FollowButtonProps {
	userId: string // of the user to be followed
}

export default function FollowButton({ userId }: FollowButtonProps) {
	const session = useSession()
	const [res, setRes] = useState(false)
	const [isBeingFollowed, setIsBeingFollowed] = useState(false)
	const [isLoadingBeingFollowed, startTransitionIsBeingFollowed] =
		useTransition()
	const [isLoading, startTransition] = useTransition()

	useEffect(() => {
		startTransitionIsBeingFollowed(async () => {
			const res: boolean = await checkIfUserFollowsAnotherUser(
				session?.user.id,
				userId
			)
			setIsBeingFollowed(res)
		})
	}, [session, userId, res])

	const handleFollowing = () => {
		if (!isBeingFollowed) {
			startTransition(async () => {
				const res = await followUser(session?.user.id, userId)
				setRes(res)
				setIsBeingFollowed(true)
			})
		} else {
			startTransition(async () => {
				const res = await unfollowUser(session?.user.id, userId)
				setRes(res)
				setIsBeingFollowed(false)
			})
		}
	}

	return (
		<>
			{isLoading || isLoadingBeingFollowed ? (
				<Button radius='xl' color='dark' disabled>
					Loading...
				</Button>
			) : (
				<Button
					radius='xl'
					color={isBeingFollowed ? 'gray' : '#15803d'}
					onClick={handleFollowing}
				>
					{isBeingFollowed ? 'Following' : 'Follow'}
				</Button>
			)}
		</>
	)
}
