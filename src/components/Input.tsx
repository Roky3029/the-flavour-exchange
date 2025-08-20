import { HTMLInputTypeAttribute } from 'react'
import { TextInput } from '@mantine/core'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

interface InputProps {
	label: string
	placeholder: string
	type: HTMLInputTypeAttribute
	field: ControllerRenderProps<
		{
			name: string
			email: string
			password: string
			confirmPassword: string
		},
		'name' | 'email' | 'password' | 'confirmPassword'
	>
	error?: string | FieldError
}

export function CustomInput({
	label,
	placeholder,
	type,
	field,
	error
}: InputProps) {
	// const [focused, setFocused] = useState(false)
	// const [value, setValue] = useState('')
	// const floating = value.trim().length !== 0 || focused || undefined

	return (
		<TextInput
			type={type}
			label={label}
			placeholder={placeholder}
			required
			mt='md'
			autoComplete='nope'
			radius='lg'
			error={error?.toString()}
			{...field}
		/>
	)
}
