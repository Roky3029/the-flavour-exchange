import { CATEGORIES, TYPES_OF_FOOD } from '@/data/typesOfFood'
import { z } from 'zod'

export const recipeFormDataSchema = z.object({
	title: z.string({ error: 'The title for the recipe is required' }).trim(),
	tag: z.enum(TYPES_OF_FOOD, {
		error: 'The main tag must be one of the values in the list'
	}),
	imageUrl: z.url({ error: 'The image must have a valid link' }).trim(),
	steps: z.array(z.string(), { error: 'Steps are required to be included' }),
	ingredients: z.array(z.string(), {
		error: 'You must specify the ingredients'
	}),
	etc: z.number({ error: 'You must specify the estimated time of the recipe' }),
	categories: z.enum(CATEGORIES, {
		error: 'The categories must be from the defined set'
	})
})

export type RecipeFormZod = z.infer<typeof recipeFormDataSchema>
