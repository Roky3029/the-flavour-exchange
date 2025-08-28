import {
	CATEGORIES,
	CategoryType,
	FoodType,
	TYPES_OF_FOOD
} from '@/data/typesOfFood'
import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IRecipe extends Document {
	title: string
	tag: FoodType
	imageUrl: string
	rating: number
	steps: string[]
	ingredients: string[]
	etc: number // Estimated Time of Cooking (in min)
	user: Types.ObjectId
	labels: CategoryType[]
	likeCount: number
}

const RecipeSchema = new Schema<IRecipe>(
	{
		title: { type: String, required: true },
		tag: {
			type: String,
			required: true,
			enum: TYPES_OF_FOOD
		},
		imageUrl: { type: String, required: true },
		rating: { type: Number, required: true },
		steps: { type: [String], required: true },
		ingredients: { type: [String], required: true },
		etc: { type: Number, required: true },
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		labels: {
			type: [String],
			enum: CATEGORIES,
			required: true
		},
		likeCount: {
			type: Number,
			required: true,
			default: 0
		}
	},
	{ timestamps: true }
)

const Recipe =
	mongoose.models?.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema)

export default Recipe
