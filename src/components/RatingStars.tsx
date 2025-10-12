import { hasRatedTheRecipe } from '@/methods/user/hasRatedTheRecipe'
import { rateRecipe } from '@/methods/user/rateRecipe'
import { Rating as RType } from '@/models/Recipe'
import { calculateRating } from '@/utils/calculateRating'
import { Divider, Rating, Text, Tooltip } from '@mantine/core'
import { useEffect, useState, useTransition } from 'react'

interface RatingStarsProps {
	rating: RType[]
	sessionId: string
	userId: string
	recipeId: string
}

export default function RatingStars({
	rating,
	sessionId,
	userId,
	recipeId
}: RatingStarsProps) {
	// first, check that the user has not rated the recipe yet
	const [res, setRes] = useState(rating)
	const [localUserRating, setLocalUserRating] = useState(0)
	const [hasBeenRated, setHasBeenRated] = useState(false)
	const [isPendingCheckRated, startTransitionCheckRated] = useTransition()
	const [isPendingToBeRated, startTransitionIsPendingToBeRated] =
		useTransition()

	useEffect(() => {
		startTransitionCheckRated(async () => {
			const res: boolean = await hasRatedTheRecipe(sessionId, recipeId)
			setHasBeenRated(res)
		})
	}, [recipeId, sessionId, res])

	const handleRating = (e: number) => {
		setLocalUserRating(e)
		startTransitionIsPendingToBeRated(async () => {
			const res = await rateRecipe(sessionId, recipeId, e)
			if (!res.success) return

			setRes(res.newRatingArray as RType[])
		})
	}

	return (
		<div className='flex items-center justify-center gap-5'>
			{!isPendingCheckRated ? (
				hasBeenRated ? (
					<>
						<Rating
							style={{ maxWidth: 200 }}
							value={
								res.filter(r => r.userId.toString() === sessionId)[0].rating
							}
							readOnly
							size={'lg'}
							fractions={2}
						/>
						<Text>you</Text>

						<Divider orientation='vertical' size='sm' />

						<Rating
							style={{ maxWidth: 200 }}
							value={calculateRating(res)}
							readOnly
							size={'sm'}
							fractions={2}
						/>
						<Text>{calculateRating(res)}⭐ on AVG</Text>
					</>
				) : (
					<>
						<Tooltip label='Click to rate the recipe!'>
							<Rating
								style={{ maxWidth: 200 }}
								value={calculateRating(res)}
								readOnly={sessionId === userId}
								size={'lg'}
								fractions={2}
								onChange={e => handleRating(e)}
							/>
						</Tooltip>
						<Text>
							{calculateRating(res)}⭐ from {res.length} reviews
						</Text>
					</>
				)
			) : (
				<>
					<Rating style={{ maxWidth: 200 }} value={0} readOnly size={'lg'} />
					<Text>-⭐ from - reviews</Text>
				</>
			)}
		</div>
	)
}
