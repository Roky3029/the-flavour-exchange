'use client'

import { Anchor, Button, Group, SimpleGrid, Stack } from '@mantine/core'
import { CustomInput } from './Input'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { formDataSchema, FormDataZod } from '@/schemas/logInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@/utils/signIn'
import { showNotification } from '@/utils/showNotification'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { DropzoneButton } from './Dropzone'

export function RecipeForm() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataZod>({
		resolver: zodResolver(formDataSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = handleSubmit(async (formData: FormDataZod) => {
		setLoading(true)
		// TODO: handle better
		const id = showNotification(
			'We are processing your request!',
			'Please wait while we resolve it',
			4000,
			'green',
			() => {},
			true
		)
		const { error } = await signIn(formData)

		if (!error) {
			notifications.update({
				id,
				title: 'Log in successful!',
				message:
					'Enjoy your browsing through The Flavour Exchange. Redirecting to main page...',
				autoClose: 5000,
				color: 'grape',
				onClose: () => router.push('/timeline'),
				loading: false
			})
		} else {
			notifications.update({
				id,
				title: 'Oops, something went wrong during log in!',
				message: 'Please check your credentials or try again later',
				autoClose: 5000,
				color: 'red',
				loading: false
			})
			setLoading(false)
		}
	})

	return (
		<SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md' w='70%'>
			{/* Left column */}
			<div className='flex items-center justify-center'>
				<DropzoneButton />
			</div>

			{/* Right column */}
			<Stack gap='md'>
				<form onSubmit={onSubmit}>
					<Controller
						name='email'
						control={control}
						rules={{
							required: {
								message: 'The email is required',
								value: true
							}
						}}
						render={({ field }) => (
							<CustomInput
								label='Email'
								placeholder='sprucespringclean@domain.com'
								type='text'
								field={field}
								error={errors.email ? errors.email.message : ''}
							/>
						)}
					/>

					<Controller
						name='password'
						control={control}
						rules={{
							required: {
								message: 'The password is required',
								value: true
							}
						}}
						render={({ field }) => (
							<CustomInput
								label='Password'
								placeholder='******'
								type='password'
								field={field}
								error={errors.password ? errors.password.message : ''}
							/>
						)}
					/>

					<Group justify='space-between' mt='xl'>
						<Anchor component='div' c='dimmed' size='xs'>
							<Link href={'/auth/signup'}>
								Don&apos;t have an account? Sign up
							</Link>
						</Anchor>
						<Button
							type='submit'
							radius='xl'
							color='#15803d'
							disabled={loading}
						>
							Log in
						</Button>
					</Group>
				</form>
			</Stack>
		</SimpleGrid>
	)
}
