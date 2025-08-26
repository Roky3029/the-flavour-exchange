'use client'

import { Button, Container, Stack } from '@mantine/core'
import { RecipeInput } from './RecipeInput'
import { useForm, Controller } from 'react-hook-form'
import { RecipeFormZod, recipeFormDataSchema } from '@/schemas/recipeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@/utils/signIn'
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

export function RecipeForm() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<RecipeFormZod>({
		resolver: zodResolver(recipeFormDataSchema),
		defaultValues: {
			title: '',
			etc: 0,
			imageUrl:
				'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
			steps: [],
			ingredients: []
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
		const result = await createRecipe(formData)

		if (result.success && result.code === 200) {
			notifications.update({
				id,
				title: 'Recipe created successfully!',
				message: "Wow! That looks tasty! Redirecting to the recipe's page",
				autoClose: 5000,
				color: 'grape',
				onClose: () => router.push(`/recipe/${result.data}`),
				loading: false
			})
		} else {
			notifications.update({
				id,
				title: 'Oops, something went wrong trying to create the recipe!',
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
						{/* TODO: create the privary opcion (private, public, etc) */}
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
					Submit recipe
				</Button>
			</form>
		</Stack>
	)
}
