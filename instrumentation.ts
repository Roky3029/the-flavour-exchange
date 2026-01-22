import connectDB from '@/lib/connectDB'

export async function register() {
	await connectDB()
}
