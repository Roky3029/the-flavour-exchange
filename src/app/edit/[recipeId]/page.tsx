import { RecipeForm } from '@/components/forms/RecipeForm'
import { Navbar } from '@/components/Navbar'
import { Data } from '@/types/recipe'
import { fetchRecipe } from '@/methods/recipes/fetchRecipe'
import { getSession } from '@/methods/user/getSession'
import { notFound } from 'next/navigation'

interface EditRecipeInterface {
	params: Promise<{ recipeId: string }>
}

export default async function EditRecipe({ params }: EditRecipeInterface) {
	const { recipeId } = await params
	const recipe = await fetchRecipe(recipeId)
	const session = await getSession()

	if (!recipe || !session) return notFound()

	const r = recipe as Data
	if (session.user.id !== r.user._id.toString()) return <p>401. Unauthorized</p>

	return (
		<div className='flex items-center justify-center flex-col gap-10'>
			<Navbar />
			<RecipeForm recipeString={JSON.stringify(r)} />
		</div>
	)
}
