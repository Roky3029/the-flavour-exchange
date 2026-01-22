import { Navbar } from '@/components/Navbar'
import MainBanner from './components/MainBanner'
import Recipes from './components/Recipes'
import { getSession } from '@/methods/user/getSession'
import { getRecipes } from '@/methods/recipes/getRecipes'
import { User as UserType } from '@/types/user'
import User from '@/models/User'
import { getFollowingCount } from '@/methods/user/getFollowingCount'

export default async function UserPage() {
	const session = await getSession()

	const recipes = await getRecipes(session?.user.id as string)
	const userData: UserType | null = await User.findById(session?.user.id)

	if (!userData) return

	return (
		<div className='pb-32'>
			<Navbar wantMarginBottom />

			<MainBanner
				name={session?.user.name as string}
				following={(await getFollowingCount(userData._id)) as number}
				followers={userData.followerCount}
			/>

			<Recipes recipes={recipes} />
		</div>
	)
}
