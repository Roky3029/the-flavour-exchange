import { useSession } from '@/hooks/useSession'
import { addLike, removeLike } from '@/methods/recipes/likeActions'
import { hasLikedThePost } from '@/methods/recipes/hasLikedThePost'
import { ActionIcon, Text } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { useEffect, useState, useTransition } from 'react'

interface LikeButtonProps {
	likeCount: number
	userWhoCreatedTheRecipe: string
	recipeId: string
}

export default function LikeButton({
	likeCount,
	userWhoCreatedTheRecipe,
	recipeId
}: LikeButtonProps) {
	const session = useSession()
	const [res, setRes] = useState(likeCount)
	const [hasBeenLiked, setHasBeenLiked] = useState(false)
	const [isPending, startTransition] = useTransition()
	const [isPendingLiked, startTransitionLiked] = useTransition()

	useEffect(() => {
		startTransitionLiked(async () => {
			const res: boolean = await hasLikedThePost(session?.user.id, recipeId)
			setHasBeenLiked(res)
		})
	}, [recipeId, session, res])

	if (!session) return

	const handleLikeButton = () => {
		if (hasBeenLiked) {
			startTransition(async () => {
				const res = await removeLike(recipeId, session?.user.id)
				setRes(res)
			})
		} else {
			startTransition(async () => {
				const res = await addLike(recipeId, session?.user.id)
				setRes(res)
			})
		}
	}

	return (
		<>
			{!isPendingLiked ? (
				<ActionIcon
					component='div'
					variant='default'
					radius='md'
					size={36}
					className={`${
						session.user.id === userWhoCreatedTheRecipe
							? 'pointer-events-none'
							: ''
					}`}
					w='10%'
					onClick={handleLikeButton}
					bg={hasBeenLiked ? 'gray' : 'dark'}
				>
					<IconHeart
						className={`text-red-500 w-5 h-5 mr-2.5 ${
							hasBeenLiked ? 'fill-red-500' : ''
						}`}
						stroke={1.5}
					/>
					<Text
						inherit
						variant='gradient'
						gradient={{ from: 'green', to: 'yellow' }}
						size='lg'
					>
						{isPending ? (hasBeenLiked ? res - 1 : res + 1) : res}
					</Text>
				</ActionIcon>
			) : (
				<ActionIcon
					component='div'
					variant='default'
					radius='md'
					size={36}
					className={`${
						session.user.id === userWhoCreatedTheRecipe
							? 'pointer-events-none'
							: ''
					}`}
					w='10%'
					disabled
					bg='dark'
				>
					<IconHeart className='text-red-500 w-5 h-5 mr-2.5' stroke={1.5} />
					<Text
						inherit
						variant='gradient'
						gradient={{ from: 'green', to: 'yellow' }}
						size='lg'
					>
						-
					</Text>
				</ActionIcon>
			)}
		</>
	)
}
