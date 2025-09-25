import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
	_id: Types.ObjectId
	name: string
	email: string
	likedPosts: Types.ObjectId[]
	following: Types.ObjectId[]
	followerCount: number
	// password: string
}

const UserSchema = new Schema<IUser>(
	{
		_id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		likedPosts: { type: [Schema.Types.ObjectId], required: true, default: [] },
		following: { type: [Schema.Types.ObjectId], required: true, default: [] },
		followerCount: { type: Number, required: true, default: 0 }
	},
	{ timestamps: true }
)

const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema)

export default User
