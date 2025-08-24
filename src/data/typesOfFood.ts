export const TYPES_OF_FOOD_CONST = [
	'side_dish',
	'entree',
	'dish',
	'dessert',
	'sauce',
	'drink',
	'snack'
] as const

export const CATEGORIES_CONST = [
	'italian',
	'mexican',
	'spanish',
	'japanese',
	'asian',
	'european',
	'american',
	'african',
	'oceania',
	'vegerarian',
	'vegan',
	'gluten-free',
	'nut-free',
	'dairy-free',
	'soy-free',
	'wheat-free',
	'baked',
	'fried',
	'grilled',
	'steamed',
	'raw',
	'under-15-min',
	'30-60min',
	'more-1h',
	'easy',
	'medium',
	'hard',
	'single-size',
	'couple-size',
	'family-size',
	'summer',
	'winter',
	'spring',
	'automn',
	'spicy-free',
	'mild-spicy',
	'medium-spicy',
	'very-spicy',
	'low-calorie',
	'high-protein',
	'low-carb'
] as const

export type CategoryType = (typeof CATEGORIES_CONST)[number]
export type FoodType = (typeof TYPES_OF_FOOD_CONST)[number]

export const CATEGORIES: CategoryType[] = [...CATEGORIES_CONST]
export const TYPES_OF_FOOD: FoodType[] = [...TYPES_OF_FOOD_CONST]
