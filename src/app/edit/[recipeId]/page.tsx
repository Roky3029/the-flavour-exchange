import { RecipeForm } from '@/components/forms/RecipeForm'
import { Navbar } from '@/components/Navbar'
import { Data } from '@/types/recipe'
import { fetchRecipe } from '@/utils/fetchRecipe'
import { getSession } from '@/utils/getSession'

interface EditRecipeInterface {
	params: Promise<{ recipeId: string }>
}

export default async function EditRecipe({ params }: EditRecipeInterface) {
	const { recipeId } = await params
	const recipe = await fetchRecipe(recipeId)
	const session = await getSession()

	if (!recipe || !session) return <p>Nope.</p> // TODO: create the 404 page

	const r = recipe as Data
	if (session.user.id !== r.user._id.toString()) return <p>401. Unauthorized</p>

	return (
		<div className='flex items-center justify-center flex-col gap-10'>
			<Navbar />
			<RecipeForm recipeString={JSON.stringify(r)} />
		</div>
	)
}
