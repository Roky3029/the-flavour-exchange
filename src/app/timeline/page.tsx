import { Navbar } from '@/components/Navbar'
import { getTimelineRecipes } from '@/methods/misc/getTimelineRecipes'
import { getSession } from '@/methods/user/getSession'
import { Data } from '@/types/recipe'
import { checkIfUserIsLogged } from '@/utils/checkIfUserIsLogged'
import FollowingRecipes from './components/FollowingRecipes'
import DiscoverRecipes from './components/DiscoverRecipes'

interface recipesInterface {
	recipesFromFollowingUsers: Data[]
	mostRecentRecipes: Data[]
}

export default async function Timeline() {
	await checkIfUserIsLogged()

	const session = await getSession()

	const recipes: recipesInterface = await getTimelineRecipes(session!.user.id)

	return (
		<div>
			<Navbar />

			{/* TODO: componentize this */}
			<FollowingRecipes
				recipesFromFollowers={recipes.recipesFromFollowingUsers}
			/>

			<DiscoverRecipes mostRecentRecipes={recipes.mostRecentRecipes} />
		</div>
	)
}
