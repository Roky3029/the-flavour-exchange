import { Navbar } from '@/components/Navbar'
import { RecipeForm } from '@/components/forms/RecipeForm'
import { Title } from '@mantine/core'

export default function Create() {
	return (
		<div className='flex items-center justify-center flex-col gap-10'>
			<Navbar />

			<Title>Publish a new recipe</Title>

			<RecipeForm />
		</div>
	)
}
