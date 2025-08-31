import { InputWrapper, Select } from '@mantine/core'
import classes from '@/styles/SelectInput.module.css'
import { CategoryType, FoodType } from '@/data/typesOfFood'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

interface Option {
	id: string
	name: string
	icon: string
}

interface SelectInputProps {
	label: string
	options: Option[]
	field: ControllerRenderProps<
		{
			title: string
			tag: FoodType
			imageUrl: string
			steps: string[]
			ingredients: string[]
			etc: number
			categories: CategoryType[]
		},
		'tag'
	>
	error?: string | FieldError
}

export const SelectInput = ({
	options,
	label,
	field,
	error
}: SelectInputProps) => {
	const dataArray = options.map(o => ({
		value: o.id,
		label: o.name
	}))

	return (
		<div className='flex items-center justify-center w-full flex-col'>
			<InputWrapper label={label} withAsterisk flex={1} className='w-full'>
				<Select
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={dataArray}
					placeholder='Pick one'
					classNames={classes}
					className='w-full'
					// disabled={Boolean(field.value)}
					searchable
					error={error?.toString()}
					{...field}
					value={field.value || null}
					onChange={id => field.onChange(id as FoodType)}
				/>
			</InputWrapper>
			{/* <div className='flex items-center justify-center w-full gap-10 mt-5'>
				{selectedOption && (
					<Badge
						variant='light'
						key={selectedOption.id}
						leftSection={
							TYPES_OF_FOOD_ICONS.filter(
								type => type.name === selectedOption.name
							)[0].icon
						}
						onClick={() => {
							field.onChange(undefined)
						}}
					>
						{selectedOption.name}
					</Badge>
				)}
			</div> */}
		</div>
	)
}
