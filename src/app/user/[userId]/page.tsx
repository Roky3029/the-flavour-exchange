import { Navbar } from '@/components/Navbar'
import { fetchUser } from '@/methods/user/fetchUser'
import { getSession } from '@/methods/user/getSession'
import UserBanner from './components/UserBanner'
import { User } from '@/types/user'
import { getRecipesByUserId } from '@/methods/recipes/getRecipesByUserId'
import { Data } from '@/types/recipe'
import UserRecipes from './components/UserRecipes'
import { notFound, redirect } from 'next/navigation'
import { getFollowingCount } from '@/methods/user/getFollowingCount'

interface UserPageInterface {
	params: Promise<{ userId: string }>
}

type RecipesResponse = Data[] | undefined

export default async function UserPage({ params }: UserPageInterface) {
	const { userId } = await params
	const session = await getSession()

	if (session && userId === session?.user?.id) redirect('/user')

	const user: User = await fetchUser(userId)
	if (!user) return notFound()

	const userRecipes = await getRecipesByUserId(user._id)
	const following = await getFollowingCount(user._id)

	return (
		<div className='flex flex-col items-center justify-center gap-10 pb-32'>
			<Navbar />

			<UserBanner
				name={user.name}
				id={user._id.toString()}
				following={following as number}
				followers={user.followerCount}
			/>

			<UserRecipes
				username={user.name}
				recipes={userRecipes as RecipesResponse}
			/>
		</div>
	)
}
