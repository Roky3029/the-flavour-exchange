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
import { useForm } from '@mantine/form'
import { GoogleButton } from './buttons/GoogleButton'
import { GithubButton } from './buttons/GithubButton'
import { CustomInput } from './Input'
import Link from 'next/link'

export function LogInForm(props: PaperProps) {
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: '',
			terms: true
		},

		validate: {
			email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
			password: val =>
				val.length <= 6 ? 'Password should include at least 6 characters' : null
		}
	})

	return (
		<Paper
			radius='md'
			p='lg'
			withBorder
			{...props}
			className='w-full max-w-1/3 relative'
		>
			<Text size='lg' fw={500}>
				Welcome back to The Flavour Exchange, log in with
			</Text>

			<Group grow mb='md' mt='md'>
				<GoogleButton radius='xl'>Google</GoogleButton>
				<GithubButton radius='xl'>Github</GithubButton>
			</Group>

			<Divider label='Or continue with email' labelPosition='center' my='lg' />

			<form onSubmit={form.onSubmit(() => {})} className='space-y-10'>
				<CustomInput
					label='Email'
					placeholder='fernandoalonso@astonmartin.com'
					type='email'
				/>
				<CustomInput label='Password' placeholder='******' type='password' />

				<Group justify='space-between' mt='xl'>
					<Anchor component='div' c='dimmed' size='xs'>
						<Link href={'/auth/signup'}>
							Don&apos;t have an account? Sign up
						</Link>
					</Anchor>
					<Button type='submit' radius='xl' color='#15803d'>
						Log in
					</Button>
				</Group>
			</form>
		</Paper>
	)
}
