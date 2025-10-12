import { Rating } from '@/models/Recipe'

export const calculateRating = (ratings: Rating[]) => {
	if (ratings.length === 0) return 0
	let sum = 0

	for (let i = 0; i < ratings.length; i++) {
		sum += ratings[i].rating
	}

	return parseFloat((sum / ratings.length).toFixed(2))
}
