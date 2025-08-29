import { Navbar } from '@/components/Navbar'
import MainBanner from './components/MainBanner'
import Recipes from './components/Recipes'
import { getSession } from '@/utils/getSession'
import { getRecipes } from '@/utils/getRecipes'

export default async function User() {
	const session = await getSession()

	const recipes = await getRecipes(session?.user.id as string)

	return (
		<div className='pb-32'>
			<Navbar wantMarginBottom />

			<MainBanner name={session?.user.name as string} />

			<Recipes recipes={recipes} />
		</div>
	)
}
