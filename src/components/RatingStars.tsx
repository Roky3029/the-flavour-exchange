import { hasRatedTheRecipe } from '@/methods/user/hasRatedTheRecipe'
import { rateRecipe, removeRate } from '@/methods/user/rateActions'
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

	const handleRating = (e?: number) => {
		if (hasBeenRated) {
			startTransitionIsPendingToBeRated(async () => {
				const res = await removeRate(sessionId, recipeId)
				if (!res.success) return

				setRes(res.newRatingArray as RType[])
			})
		} else {
			startTransitionIsPendingToBeRated(async () => {
				const res = await rateRecipe(sessionId, recipeId, e as number)
				if (!res.success) return

				setRes(res.newRatingArray as RType[])
			})
		}
	}

	return (
		<div className='flex items-center justify-center gap-5'>
			{!isPendingCheckRated && !isPendingToBeRated ? (
				hasBeenRated ? (
					// Component to render if the user has rated the recipe
					<div className='flex items-center justify-center flex-col'>
						<Tooltip label='Click to delete your rating' color='red'>
							<Rating
								style={{ maxWidth: 200 }}
								value={
									res.filter(r => r.userId.toString() === sessionId)[0].rating
								}
								size={'lg'}
								readOnly
								fractions={2}
								onClick={() => handleRating()}
							/>
						</Tooltip>
						<Text>you</Text>

						<Divider size='lg' my={5} />

						<Rating
							style={{ maxWidth: 200 }}
							value={calculateRating(res)}
							readOnly
							size={'xs'}
							fractions={2}
						/>
						<Text size='sm'>
							{calculateRating(res)}⭐ on avg (out of {res.length})
						</Text>
					</div>
				) : (
					// Component to render if the user has not rated the recipe
					<>
						<Tooltip
							label='Click to rate the recipe!'
							disabled={sessionId === userId}
						>
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
				// Component to show if the main component is loading
				<>
					<Rating style={{ maxWidth: 200 }} value={0} readOnly size={'lg'} />
					<Text>-⭐ from - reviews</Text>
				</>
			)}
		</div>
	)
}
