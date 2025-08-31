'use client'

import { Button, Container, Stack } from '@mantine/core'
import { RecipeInput } from './RecipeInput'
import { useForm, Controller } from 'react-hook-form'
import { RecipeFormZod, recipeFormDataSchema } from '@/schemas/recipeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { showNotification } from '@/utils/showNotification'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { DropzoneButton } from './Dropzone'
import { SelectInput } from './SelectInput'
import { MultipleSelectionInput } from './MultipleSelectionInput'
import { CATEGORIES_ICONS, TYPES_OF_FOOD_ICONS } from '../../data/FoodIcons'
import { MultipleInputsTextareas } from './MultipleInputsTextareas'
import { createRecipe } from '@/utils/createRecipe'
import { Data } from '@/types/recipe'
import { CategoryType, FoodType } from '@/data/typesOfFood'
import { updateRecipe } from '@/utils/updateRecipe'

interface RecipeFormProps {
	recipeString?: string
}

export function RecipeForm({ recipeString }: RecipeFormProps) {
	let r
	if (recipeString) r = JSON.parse(recipeString) as Data
	const recipe = r as Data
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<RecipeFormZod>({
		resolver: zodResolver(recipeFormDataSchema),
		defaultValues: {
			title: recipe ? recipe.title : '',
			etc: recipe ? recipe.etc : 0,
			imageUrl: recipe
				? recipe.imageUrl
				: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
			steps: recipe ? recipe.steps : [],
			ingredients: recipe ? recipe.ingredients : [],
			tag: recipe ? (recipe.tag as FoodType) : undefined,
			categories: recipe ? (recipe.labels as CategoryType[]) : undefined
		}
	})

	const onSubmit = handleSubmit(async (formData: RecipeFormZod) => {
		setLoading(true)
		const id = showNotification(
			'We are processing your request!',
			'Please wait while we resolve it',
			4000,
			'green',
			() => {},
			true
		)
		// const result = await createRecipe(formData)
		const result = recipe
			? await updateRecipe(formData, recipe._id)
			: await createRecipe(formData)

		if (result.success && result.code === 200) {
			notifications.update({
				id,
				title: recipe
					? 'Recipe updated successfully!'
					: 'Recipe created successfully!',
				message: recipe
					? "Wow! That change makes it even better! Redirecting to the recipe's page"
					: "Wow! That looks delicious! Redirecting to the recipe's page",
				autoClose: 5000,
				color: 'grape',
				onClose: recipe
					? () => router.push(`/recipes/${recipe._id}`)
					: () => router.push(`/recipes/${result.data}`),
				loading: false
			})
		} else {
			notifications.update({
				id,
				title: recipe
					? 'Oops, something went wrong trying to update the recipe!'
					: 'Oops, something went wrong trying to create the recipe!',
				message: 'Please check the fields or try again later',
				autoClose: 5000,
				color: 'red',
				loading: false
			})
			setLoading(false)
		}
	})

	return (
		<Stack gap='md'>
			<form
				onSubmit={onSubmit}
				className='w-full flex items-center justify-center flex-col pb-40'
			>
				<section className='grid grid-cols-1 md:grid-cols-2 w-full gap-10'>
					<div className='flex items-center justify-center'>
						{/* TODO: handle the image submission */}
						{/* TODO: create the privacy opcion (private, public, etc) */}
						<DropzoneButton />
					</div>
					<div>
						<Controller
							name='title'
							control={control}
							rules={{
								required: {
									message: 'The title is required',
									value: true
								}
							}}
							render={({ field }) => (
								<RecipeInput
									label='Title'
									placeholder='Mashed potatoes with garlic mayo'
									type='text'
									field={field}
									error={errors.title ? errors.title.message : ''}
								/>
							)}
						/>

						<Controller
							name='etc'
							control={control}
							rules={{
								required: {
									message: 'The estimated time of cooking is required',
									value: true
								}
							}}
							render={({ field }) => (
								<RecipeInput
									label='ETC'
									placeholder='40'
									type='number'
									field={field}
									error={errors.etc ? errors.etc.message : ''}
								/>
							)}
						/>
					</div>
				</section>
				<Container
					w='100%'
					mt={'md'}
					className='flex justify-center items-center w-full gap-20'
				>
					<div className='w-1/2 flex justify-center items-center'>
						<Controller
							name='tag'
							control={control}
							rules={{
								required: {
									message: 'The tag is required',
									value: true
								}
							}}
							render={({ field }) => (
								<SelectInput
									options={TYPES_OF_FOOD_ICONS}
									label='Select the main tag of the recipe'
									field={field}
									error={errors.tag ? errors.tag.message : ''}
								/>
							)}
						/>
					</div>
					<div className='w-1/2 flex justify-center items-center'>
						<Controller
							name='categories'
							control={control}
							rules={{
								required: {
									message: 'The categories are required',
									value: true
								}
							}}
							render={({ field }) => (
								<MultipleSelectionInput
									options={CATEGORIES_ICONS}
									label='Select the categories of the recipe (5 max)'
									field={field}
									error={errors.categories ? errors.categories.message : ''}
								/>
							)}
						/>
						{/* TODO: seems like if something was wrong in this component because in both steps and ingredients there are sometimes that the last letter is not captured */}
					</div>
				</Container>

				<Container
					w='100%'
					mt={'md'}
					className='flex items-center justify-center w-full gap-20 pt-20'
				>
					<Controller
						name='ingredients'
						control={control}
						rules={{
							required: {
								message: 'The ingredients are required',
								value: true
							}
						}}
						render={({ field }) => (
							<MultipleInputsTextareas
								mode='inputs'
								maxN={15}
								title='Ingredient list'
								field={field}
								error={errors.ingredients ? errors.ingredients.message : ''}
								recipe={recipe}
							/>
						)}
					/>
				</Container>

				<Container
					w='100%'
					mt={'md'}
					className='flex items-center justify-center w-full gap-20'
				>
					<Controller
						name='steps'
						control={control}
						rules={{
							required: {
								message: 'The steps are required',
								value: true
							}
						}}
						render={({ field }) => (
							<MultipleInputsTextareas
								mode='textarea'
								maxN={10}
								title='Steps'
								field={field}
								error={errors.steps ? errors.steps.message : ''}
								recipe={recipe}
							/>
						)}
					/>
				</Container>

				<Button
					w='100%'
					variant='gradient'
					gradient={{ from: 'green', to: 'yellow' }}
					disabled={loading}
					type='submit'
				>
					{recipe ? 'Update recipe' : 'Submit recipe'}
				</Button>
			</form>
		</Stack>
	)
}
