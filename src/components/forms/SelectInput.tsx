import { Badge, Select } from '@mantine/core'
import classes from '@/styles/SelectInput.module.css'
import { FoodType } from '@/data/typesOfFood'
import { useState } from 'react'

interface SelectInputProps {
	label: string
	options: FoodType[]
}

export const SelectInput = ({ options, label }: SelectInputProps) => {
	const [value, setValue] = useState<FoodType>()
	return (
		<div className='flex items-center justify-center w-full flex-col gap-10'>
			<Select
				mt='md'
				comboboxProps={{ withinPortal: true }}
				data={options}
				placeholder='Pick one'
				label={label}
				classNames={classes}
				value={value}
				onChange={(value, option) => {
					setValue(option.value as FoodType)
				}}
				className='w-full'
				disabled={Boolean(value)}
			/>

			<div className='flex items-center justify-center w-full gap-10'>
				{value && (
					<Badge
						variant='light'
						key={value}
						/* leftSection={} */
						onClick={() => {
							setValue(undefined)
						}}
					>
						{value}
					</Badge>
				)}
			</div>
		</div>
	)
}
