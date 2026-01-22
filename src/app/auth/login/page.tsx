import { LogInForm } from '@/components/forms/LogInForm'

export default function LoginPage() {
	return (
		<div className='flex items-center justify-center w-full h-screen bg-[url(/restaurant.jpg)] relative bg-cover bg-center'>
			<div className='absolute inset-0 bg-black/70'></div>
			<LogInForm />
		</div>
	)
}
