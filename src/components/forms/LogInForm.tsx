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
import { formDataSchema, FormDataZod } from '@/schemas/logInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from '@/methods/user/signIn'
import { showNotification } from '@/utils/showNotification'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { useState } from 'react'

export function LogInForm(props: PaperProps) {
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
				onClose: () => router.push('/user'),
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
		<Paper
			radius='md'
			p='lg'
			withBorder
			{...props}
			className='w-full md:max-w-1/3 mx-4 relative'
		>
			<Text size='lg' fw={500}>
				Welcome back to The Flavour Exchange! Log in with
			</Text>

			<Group grow mb='md' mt='md'>
				<GoogleButton radius='xl'>Google</GoogleButton>
				<GithubButton radius='xl'>Github</GithubButton>
			</Group>

			<Divider label='Or continue with email' labelPosition='center' my='lg' />

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
					<Button type='submit' radius='xl' color='#15803d' disabled={loading}>
						Log in
					</Button>
				</Group>
			</form>
		</Paper>
	)
}
