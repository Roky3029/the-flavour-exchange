import { Navbar } from '@/components/Navbar'
import { fetchUser } from '@/methods/user/fetchUser'
import { getSession } from '@/methods/user/getSession'
import UserBanner from './components/UserBanner'
import { User } from '@/types/user'
import { getRecipesByUserId } from '@/methods/recipes/getRecipesByUserId'
import { Data } from '@/types/recipe'
import UserRecipes from './components/UserRecipes'

interface UserPageInterface {
	params: Promise<{ userId: string }>
}

type RecipesResponse = Data[] | undefined

export default async function UserPage({ params }: UserPageInterface) {
	const { userId } = await params
	const session = await getSession()
	if (!session) return

	const user: User = await fetchUser(userId, session.user.id)
	if (!user) return <p>Nope.</p> // TODO: create the 404 page

	const userRecipes = await getRecipesByUserId(user._id)

	return (
		<div className='flex flex-col items-center justify-center gap-10 pb-32'>
			<Navbar />

			<UserBanner name={user.name} />

			<UserRecipes
				username={user.name}
				recipes={userRecipes as RecipesResponse}
			/>
		</div>
	)
}
