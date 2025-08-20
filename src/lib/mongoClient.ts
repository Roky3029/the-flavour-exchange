import { MongoClient } from 'mongodb'

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined
}

const MONGO_URI = process.env.MONGO_URI || ''

let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
	const client = new MongoClient(MONGO_URI)
	global._mongoClientPromise = client.connect()
}

// eslint-disable-next-line prefer-const
clientPromise = global._mongoClientPromise

export default clientPromise as Promise<MongoClient>
