import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
	_id: Types.ObjectId
	name: string
	email: string
	// password: string
}

const UserSchema = new Schema<IUser>(
	{
		_id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true }
	},
	{ timestamps: true }
)

// console.log(mongoose.models.User)

const User = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema)

export default User
