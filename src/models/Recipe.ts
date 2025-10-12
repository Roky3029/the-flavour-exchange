import {
	CATEGORIES,
	CategoryType,
	FoodType,
	TYPES_OF_FOOD
} from '@/data/typesOfFood'
import mongoose, { Schema, Document, Types } from 'mongoose'

export interface Rating {
	userId: Types.ObjectId
	rating: number
}
export interface IRecipe extends Document {
	title: string
	tag: FoodType
	imageUrl: string
	rating: Rating[]
	steps: string[]
	ingredients: string[]
	etc: number // Estimated Time of Cooking (in min)
	user: Types.ObjectId
	labels: CategoryType[]
	likeCount: number
}

const RatingSchema = new Schema<Rating>({
	rating: { type: Number },
	userId: { type: Schema.Types.ObjectId }
})

const RecipeSchema = new Schema<IRecipe>(
	{
		title: { type: String, required: true },
		tag: {
			type: String,
			required: true,
			enum: TYPES_OF_FOOD
		},
		imageUrl: { type: String, required: true },
		rating: { type: [RatingSchema], required: true },
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
