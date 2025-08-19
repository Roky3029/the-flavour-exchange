interface MongooseCache {
	conn: typeof mongoose | null
	promise: Promise<typeof mongoose> | null
}

// Tell TypeScript that globalThis has a `mongoose` property
declare global {
	var mongoose: MongooseCache | undefined
}
// lib/mongodb.js
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || ''

if (!MONGO_URI) {
	throw new Error('Please define the MONGO_URI variable in the .env file')
}

/*
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API route usage.
 */
let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
	if (cached!.conn) {
		return cached!.conn
	}

	if (!cached!.promise) {
		cached!.promise = mongoose
			.connect(MONGO_URI, { dbName: 'tfeDb' })
			.then(mongoose => {
				console.log('✅ MongoDB connected')
				return mongoose
			})
	}

	cached!.conn = await cached!.promise
	return cached!.conn
}

export default connectDB
