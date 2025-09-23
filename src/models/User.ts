import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
	_id: Types.ObjectId
	name: string
	email: string
	likedPosts: Types.ObjectId[]
	// password: string
}

const UserSchema = new Schema<IUser>(
	{
		_id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		likedPosts: { type: [Schema.Types.ObjectId], required: true, default: [] }
	},
	{ timestamps: true }
)

const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema)

export default User
