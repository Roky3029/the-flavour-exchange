'use client'

import {
	Anchor,
	Button,
	Divider,
	Group,
	Paper,
	PaperProps,
	Text
} from '@mantine/core'
import { GoogleButton } from './buttons/GoogleButton'
import { GithubButton } from './buttons/GithubButton'
import { CustomInput } from './RegisterInput'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { formDataSchema, FormDataZod } from '@/schemas/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/authClient'
import { showNotification } from '@/utils/showNotification'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SignUpForm(props: PaperProps) {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataZod>({
		resolver: zodResolver(formDataSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
		}
	})
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const onSubmit = handleSubmit(async (formData: FormDataZod) => {
		// TODO: create the google and github signup
		setLoading(true)

		const id = showNotification(
			'We are trying to sign you up',
			'Please wait while we do so',
			-1,
			'teal',
			() => {},
			true
		)

		const { data, error } = await authClient.signUp.email({
			name: formData.name,
			email: formData.email,
			password: formData.password
		})

		const res = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				id: data?.user.id,
				name: formData.name,
				email: formData.email
			})
		})

		const result = await res.json()

		if (data && !error && result.success) {
			notifications.update({
				id,
				title: 'Signed up correctly!',
				message: 'You will now be redirected to your dashboard',
				autoClose: 5000,
				color: 'green',
				onClose: () => router.push('/timeline'),
				loading: false
			})
		} else {
			notifications.update({
				id,
				title: 'Oops! Something strange happened',
				message: 'Please check the data and/or try again later',
				autoClose: 5000,
				color: 'red',
				onClose: () => {},
				loading: false
			})
		}
		setLoading(false)
	})

	return (
		<Paper
			radius='md'
			p='lg'
			withBorder
			{...props}
			className='w-full md:max-w-1/3 mx-4 relative'
		>
			<Text size='lg' fw={500}>
				Welcome to The Flavour Exchange, register with
			</Text>

			<Group grow mb='md' mt='md'>
				<GoogleButton radius='xl'>Google</GoogleButton>
				<GithubButton radius='xl'>Github</GithubButton>
			</Group>

			<Divider label='Or continue with email' labelPosition='center' my='lg' />

			<form onSubmit={onSubmit}>
				<Controller
					name='name'
					control={control}
					rules={{
						required: {
							message: 'The name is required',
							value: true
						}
					}}
					render={({ field }) => (
						<CustomInput
							label='Name'
							placeholder='Spruce Springclean'
							type='text'
							field={field}
							error={errors.name ? errors.name.message : ''}
						/>
					)}
				/>

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

				<Controller
					name='confirmPassword'
					control={control}
					rules={{
						required: {
							message: 'The confirm password field is required',
							value: true
						}
					}}
					render={({ field }) => (
						<CustomInput
							label='Confirm password'
							placeholder='******'
							type='password'
							field={field}
							error={
								errors.confirmPassword ? errors.confirmPassword.message : ''
							}
						/>
					)}
				/>

				<Group justify='space-between' mt='xl'>
					<Anchor component='div' c='dimmed' size='xs'>
						<Link href={'/auth/login'}>Already have an account? Log in</Link>
					</Anchor>
					<Button type='submit' radius='xl' color='#15803d' disabled={loading}>
						Register
					</Button>
				</Group>
			</form>
		</Paper>
	)
}
