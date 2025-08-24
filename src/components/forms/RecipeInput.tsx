import { HTMLInputTypeAttribute } from 'react'
import { TextInput } from '@mantine/core'
import { ControllerRenderProps, FieldError } from 'react-hook-form'
import { CategoryType, FoodType } from '@/data/typesOfFood'
import classes from '@/styles/RecipeInput.module.css'

interface InputProps {
	label: string
	placeholder: string
	type: HTMLInputTypeAttribute
	field: ControllerRenderProps<
		{
			title: string
			tag: FoodType
			imageUrl: string
			steps: string[]
			ingredients: string[]
			etc: number
			categories: CategoryType
		},
		'title' | 'tag' | 'imageUrl' | 'steps' | 'ingredients' | 'etc'
	>
	error?: string | FieldError
}

export function RecipeInput({
	label,
	placeholder,
	type,
	field,
	error
}: InputProps) {
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
			classNames={classes}
			className='input'
			{...field}
		/>
	)
}
