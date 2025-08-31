import { CategoryType, FoodType } from '@/data/typesOfFood'
import { Data } from '@/types/recipe'
import { Button, NativeSelect, Textarea, TextInput, Title } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { ControllerRenderProps, FieldError } from 'react-hook-form'

const data = [
	{ value: 'ml', label: 'ml' },
	{ value: 'l', label: 'liters' },
	{ value: 'g', label: 'grams' },
	{ value: 'kg', label: 'kg' },
	{ value: 'tsp', label: 'tsp' },
	{ value: 'tbsp', label: 'tbsp' },
	{ value: 'unit', label: 'units' }
]

interface IngredientsFormat {
	quant: string
	unit: string
	ingredient: string
}

interface MultipleInputsTextareasProps {
	mode: 'textarea' | 'inputs'
	maxN: number
	title: string
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
		'ingredients' | 'steps'
	>
	error?: string | FieldError
	recipe?: Data
}

export function MultipleInputsTextareas({
	mode,
	maxN,
	title,
	field,
	error,
	recipe
}: MultipleInputsTextareasProps) {
	const [number, setNumber] = useState(
		recipe
			? mode === 'inputs'
				? recipe.ingredients.length
				: recipe.steps.length
			: 2
	)

	const [rows, setRows] = useState<(IngredientsFormat | string)[]>(
		// mode === 'inputs'
		// 	? Array.from({ length: 2 }, () => ({
		// 			quant: '',
		// 			unit: data[0].value,
		// 			ingredient: ''
		// 	  }))
		// 	: Array.from({ length: 2 }, () => '')
		mode === 'inputs'
			? Array.from(
					{ length: recipe ? recipe.ingredients.length : 2 },
					(n, i) => ({
						quant: recipe ? recipe.ingredients[i].split(' ')[0] : '',
						unit: recipe ? recipe.ingredients[i].split(' ')[1] : data[0].value,
						ingredient: recipe ? recipe.ingredients[i].split(' ')[2] : ''
					})
			  )
			: Array.from({ length: recipe ? recipe.steps.length : 2 }, (n, i) =>
					recipe ? recipe.steps[i] : ''
			  )
	)

	const handleResize = (modeResize: '+' | '-') => {
		if (modeResize === '+') {
			if (number === maxN) return

			setNumber(number + 1)

			if (mode === 'inputs') {
				setRows([...rows, { quant: '', unit: data[0].value, ingredient: '' }])
			} else {
				setRows([...rows, ''])
			}
		} else {
			if (number === 2) return

			setNumber(number - 1)
			setRows(rows.slice(0, -1))
		}
	}

	const dataArray =
		mode === 'inputs'
			? rows.map(i =>
					[
						(i as IngredientsFormat).quant,
						(i as IngredientsFormat).unit,
						(i as IngredientsFormat).ingredient
					]
						.filter(Boolean)
						.join(' ')
			  )
			: (rows as string[])

	const updateRow = (
		i: number,
		key: 'quant' | 'unit' | 'ingredient' | 'text',
		value: string
	) => {
		const updated = [...rows]
		if (mode === 'inputs') {
			updated[i] = { ...(updated[i] as IngredientsFormat), [key]: value }
		} else {
			updated[i] = value // for textarea, it's just the step text
		}
		setRows(updated)
	}

	return (
		<div className='w-full grid grid-cols-1 place-content-center gap-10 pb-32'>
			<Title className='text-center'>{title}</Title>
			{[...Array(number)].map((_, i) => (
				<div className='flex items-center justify-center gap-5' key={i}>
					<Title pt={18}> {mode === 'inputs' ? ' - ' : `${i + 1}.`} </Title>
					{mode === 'inputs' ? (
						<>
							<TextInput
								flex={1}
								type='number'
								placeholder='200'
								label=' '
								value={(rows[i] as IngredientsFormat).quant}
								onChange={e => {
									updateRow(i, 'quant', e.target.value)
									field.onChange(dataArray)
								}}
								rightSection={
									<NativeSelect
										data={data}
										value={(rows[i] as IngredientsFormat).unit}
										onChange={e => {
											updateRow(i, 'unit', e.target.value)
											field.onChange(dataArray)
										}}
										rightSectionWidth={28}
										styles={{
											input: {
												fontWeight: 500,
												borderTopLeftRadius: 0,
												borderBottomLeftRadius: 0,
												width: 92,
												marginRight: -2
											}
										}}
									/>
								}
								rightSectionWidth={92}
							/>
							<TextInput
								flex={4}
								type='text'
								placeholder='sliced chicken breasts'
								label='Ingredient'
								value={(rows[i] as IngredientsFormat).ingredient}
								onChange={e => {
									updateRow(i, 'ingredient', e.target.value)
									field.onChange(dataArray)
								}}
								rightSection={
									i === number - 1 &&
									number > 2 && (
										<IconTrash
											stroke={1}
											onClick={() => handleResize('-')}
											className='cursor-pointer'
										/>
									)
								}
								error={mode === 'inputs' ? (error as string) : ''}
							/>
						</>
					) : (
						<Textarea
							flex={1}
							className='max-w-[60%]'
							placeholder='Heat to medium the pan with a splash of olive oil and then throw inside the diced breast...'
							minRows={2}
							maxRows={5}
							value={rows[i] as string}
							onChange={e => {
								updateRow(i, 'text', e.target.value)
								field.onChange(dataArray)
							}}
							rightSection={
								i === number - 1 &&
								number > 2 && (
									<IconTrash
										stroke={1}
										onClick={() => handleResize('-')}
										className='cursor-pointer'
									/>
								)
							}
							error={mode === 'textarea' ? (error as string) : ''}
						></Textarea>
					)}
				</div>
			))}

			{number !== maxN && (
				<Button color='green' w='30%' onClick={() => handleResize('+')}>
					Add new {mode === 'inputs' ? 'ingredients' : 'step'}
				</Button>
			)}
		</div>
	)
}
