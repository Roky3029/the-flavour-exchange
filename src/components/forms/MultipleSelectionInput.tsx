import { Badge, Select } from '@mantine/core'
import classes from '@/styles/SelectInput.module.css'
import { CategoryType } from '@/data/typesOfFood'
import { useState } from 'react'

interface MultipleSelectionInputProps {
	label: string
	options: CategoryType[]
}

export const MultipleSelectionInput = ({
	options,
	label
}: MultipleSelectionInputProps) => {
	const [tags, setTags] = useState<CategoryType[]>([])
	const [value, setValue] = useState<CategoryType>()
	const [opt, setOpt] = useState<CategoryType[]>(options)
	return (
		<div className='flex items-center justify-center w-full flex-col gap-10'>
			<Select
				mt='md'
				comboboxProps={{ withinPortal: true }}
				data={opt}
				placeholder='Pick one'
				label={label}
				classNames={classes}
				className='w-full'
				value={value}
				onChange={(value, option) => {
					const newOptArray = opt.filter(o => o !== option.value)
					setTags([...tags, option.value as CategoryType])
					setValue(undefined)
					setOpt(newOptArray)
				}}
				disabled={tags.length === 5}
			/>
			<div className='flex items-center justify-center w-full gap-1'>
				{tags.map((tag, i) => (
					<Badge
						variant='light'
						key={i}
						/* leftSection={} */
						onClick={() => {
							const removeTagFromArray = tags.filter(t => t !== tag)
							setTags(removeTagFromArray)
							setOpt([...opt, tag])
						}}
					>
						{tag}
					</Badge>
				))}
			</div>
		</div>
	)
}
