import mongoose, { Schema, Document, Types } from 'mongoose'

type MainTag =
	| 'side_dish'
	| 'entree'
	| 'dish'
	| 'dessert'
	| 'sauce'
	| 'drink'
	| 'snack'

export interface IRecipe extends Document {
	title: string
	tag: MainTag
	imageUrl: string
	rating: number
	steps: string[]
	ingredients: string[]
	etc: number // Estimated Time of Cooking (in min)
	user: Types.ObjectId
}

const RecipeSchema = new Schema<IRecipe>(
	{
		title: { type: String, required: true },
		tag: {
			type: String,
			required: true,
			enum: [
				'side_dish',
				'entree',
				'dish',
				'dessert',
				'sauce',
				'drink',
				'snack'
			]
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
		}
	},
	{ timestamps: true }
)

const User =
	mongoose.models?.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema)

export default User
