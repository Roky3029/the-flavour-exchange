import { CATEGORIES_ICONS, TYPES_OF_FOOD_ICONS } from '@/data/FoodIcons'

export const filterIconCoincidence = (
	mode: 'types' | 'categories',
	id: string
) => {
	const result =
		mode === 'categories'
			? CATEGORIES_ICONS.find(f => f.id === id)
			: TYPES_OF_FOOD_ICONS.find(f => f.id === id)
	return result
}
