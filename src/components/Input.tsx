import { HTMLInputTypeAttribute, useState } from 'react'
import { TextInput } from '@mantine/core'
import classes from './../styles/Input.module.css'

interface InputProps {
	label: string
	placeholder: string
	type: HTMLInputTypeAttribute
}

export function CustomInput({ label, placeholder, type }: InputProps) {
	const [focused, setFocused] = useState(false)
	const [value, setValue] = useState('')
	const floating = value.trim().length !== 0 || focused || undefined

	return (
		<TextInput
			type={type}
			label={label}
			placeholder={placeholder}
			required
			classNames={classes}
			value={value}
			onChange={event => setValue(event.currentTarget.value)}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			mt='md'
			autoComplete='nope'
			data-floating={floating}
			labelProps={{ 'data-floating': floating }}
			radius='lg'
		/>
	)
}
