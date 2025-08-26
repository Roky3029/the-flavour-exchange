import { InputWrapper, MultiSelect } from '@mantine/core'
import classes from '@/styles/SelectInput.module.css'
import { CategoryType, FoodType } from '@/data/typesOfFood'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

interface Option {
	id: string
	name: string
	icon: string
}

interface MultipleSelectionInputProps {
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
		'categories'
	>
	error?: string | FieldError
}

export const MultipleSelectionInput = ({
	options,
	label,
	field,
	error
}: MultipleSelectionInputProps) => {
	const dataArray = options.map(o => ({
		value: o.id,
		label: o.name
	}))

	return (
		<div className='flex items-center justify-center w-full flex-col gap-6'>
			<InputWrapper label={label} withAsterisk flex={1} className='w-full'>
				<MultiSelect
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={dataArray}
					placeholder='Pick categories'
					classNames={classes}
					className='w-full'
					searchable
					maxValues={5}
					error={error?.toString()}
					{...field}
					value={field.value || []}
					onChange={values => {
						field.onChange(values as CategoryType[])
					}}
				/>
			</InputWrapper>

			{/* <div className='flex flex-wrap items-center justify-start w-full gap-2'>
				{(field.value || []).map((tag: CategoryType, i: number) => (
					<Badge
						variant='light'
						key={i}
						leftSection={CATEGORIES_ICONS.find(type => type.name === tag)?.icon}
						onClick={() => {
							const newTags = field.value.filter((t: CategoryType) => t !== tag)
							field.onChange(newTags)
						}}
					>
						{tag}
					</Badge>
				))}
			</div>
			<Badge variant='transparent'></Badge> */}
			{/* <pre>{field.value}</pre> */}
		</div>
	)
}
