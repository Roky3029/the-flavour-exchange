import { Navbar } from '@/components/Navbar'
import { getTimelineRecipes } from '@/methods/misc/getTimelineRecipes'
import { getSession } from '@/methods/user/getSession'
import { Data } from '@/types/recipe'
import { checkIfUserIsLogged } from '@/utils/checkIfUserIsLogged'
import RecipesTimeline from './components/RecipesTimeline'

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

			<RecipesTimeline
				variant='following'
				recipes={recipes.recipesFromFollowingUsers}
			/>
			<RecipesTimeline variant='discover' recipes={recipes.mostRecentRecipes} />
		</div>
	)
}
