import mongoose, { Schema, Document, CallbackError } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
	name: string
	email: string
	password: string
}

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minLength: 6 }
	},
	{ timestamps: true }
)

UserSchema.pre('save', async function (next) {
	try {
		// Check if the password has been modified
		if (!this.isModified('password')) return next()

		const salt = await bcrypt.genSalt(12)
		this.password = await bcrypt.hash(this.password, salt)

		next()
	} catch (e) {
		next(e as CallbackError)
	}
})

UserSchema.methods.isValidPassword = async function (password: string) {
	try {
		return await bcrypt.compare(password, this.password)
	} catch (e) {
		throw new Error('Password comparison failed', e as ErrorOptions)
	}
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
