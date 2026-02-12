// lib/mongodb.ts
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const options = {}

declare global {
	var _mongoClientPromise: Promise<MongoClient>
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
	client = new MongoClient(uri, options)
	global._mongoClientPromise = client.connect()
}
// eslint-disable-next-line prefer-const
clientPromise = global._mongoClientPromise

export default clientPromise
