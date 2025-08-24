'use client'

import {
	Anchor,
	Button,
	Container,
	GridCol,
	Group,
	SimpleGrid,
	Stack
} from '@mantine/core'
import { RecipeInput } from './RecipeInput'
import Link from 'next/link'
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
import { CATEGORIES, TYPES_OF_FOOD } from '@/data/typesOfFood'
import { MultipleSelectionInput } from './MultipleSelectionInput'

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
			tag: 'dish',
			imageUrl:
				'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
			steps: [],
			ingredients: []
			// etc: ,
			// categories: ''
		}
	})

	// const onSubmit = handleSubmit(async (formData: RecipeFormZod) => {
	// 	setLoading(true)
	// 	// TODO: handle better
	// 	const id = showNotification(
	// 		'We are processing your request!',
	// 		'Please wait while we resolve it',
	// 		4000,
	// 		'green',
	// 		() => {},
	// 		true
	// 	)
	// 	const { error } = await signIn(formData)

	// 	if (!error) {
	// 		notifications.update({
	// 			id,
	// 			title: 'Log in successful!',
	// 			message:
	// 				'Enjoy your browsing through The Flavour Exchange. Redirecting to main page...',
	// 			autoClose: 5000,
	// 			color: 'grape',
	// 			onClose: () => router.push('/timeline'),
	// 			loading: false
	// 		})
	// 	} else {
	// 		notifications.update({
	// 			id,
	// 			title: 'Oops, something went wrong during log in!',
	// 			message: 'Please check your credentials or try again later',
	// 			autoClose: 5000,
	// 			color: 'red',
	// 			loading: false
	// 		})
	// 		setLoading(false)
	// 	}
	// })

	const onSubmit = () => {}

	return (
		<Stack gap='md'>
			<form onSubmit={onSubmit} className='w-full'>
				<section className='grid grid-cols-1 md:grid-cols-2 w-full gap-10'>
					<div className='flex items-center justify-center'>
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
					className='flex items-center justify-center w-full gap-20'
				>
					<SelectInput
						options={TYPES_OF_FOOD}
						label='Select the main tag of the recipe'
					/>
					{/* <SelectInput
						options={CATEGORIES}
						label='Select the categories of the recipe (Up to 5)'
					/> */}
					<MultipleSelectionInput
						label='Select the categories of the recipe (5 maximum)'
						options={CATEGORIES}
					/>
				</Container>
			</form>
		</Stack>
	)
}
