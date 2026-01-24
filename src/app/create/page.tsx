import { Navbar } from '@/components/Navbar'
import { RecipeForm } from '@/components/forms/RecipeForm'
import { checkIfUserIsLogged } from '@/utils/checkIfUserIsLogged'
import { Title } from '@mantine/core'

export default async function Create() {
	await checkIfUserIsLogged()

	return (
		<div className='flex items-center justify-center flex-col gap-10'>
			<Navbar />

			<Title>Publish a new recipe</Title>

			<RecipeForm />
		</div>
	)
}
