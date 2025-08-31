import { fetchRecipe } from '@/methods/recipes/fetchRecipe'
import Banner from './components/Banner'
import Ingredients from './components/Ingredients'
import Steps from './components/Steps'
import { Navbar } from '@/components/Navbar'
import { Data } from '@/types/recipe'
import { getSession } from '@/methods/user/getSession'

interface RecipeInterface {
	params: Promise<{ recipeId: string }>
}

export default async function Recipe({ params }: RecipeInterface) {
	const { recipeId } = await params
	const recipe = await fetchRecipe(recipeId)
	const session = await getSession()

	if (!recipe || !session) return <p>Nope.</p> // TODO: create the 404 page

	const r = recipe as Data

	return (
		<div className='grid place-content-center gap-10 grid-cols-1 pb-32 overflow-x-hidden'>
			<Navbar />

			<Banner
				imageUrl={r.imageUrl}
				title={r.title}
				likeCount={r.likeCount}
				etc={r.etc}
				tag={r.tag}
				rating={r.rating}
				labels={r.labels}
				userName={r.user.name}
				userId={r.user._id.toString()}
				date={r.createdAt.toString()}
				sessionId={session?.user.id as string}
			/>

			<div className='grid place-content-center grid-cols-1 lg:grid-cols-2 w-full gap-16 px-16'>
				<Ingredients ingredients={r.ingredients} />
				<Steps steps={r.steps} />
			</div>
		</div>
	)
}
