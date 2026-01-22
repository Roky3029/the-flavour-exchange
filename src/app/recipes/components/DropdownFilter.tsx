import { InputWrapper, MultiSelect, Select } from '@mantine/core'
import classes from '@/styles/SelectInput.module.css'

interface Option {
	id: string
	name: string
	icon?: string
}

type SingleDropdownFilterProps = {
	mode?: 'single'
	label: string
	data: Option[]
	value: string | null
	onChange: (value: string | null) => void
}

type MultiDropdownFilterProps = {
	mode: 'multiple'
	label: string
	data: Option[]
	value: string[]
	onChange: (value: string[]) => void
}

type DropdownFilterProps = SingleDropdownFilterProps | MultiDropdownFilterProps

export const DropdownFilter = (props: DropdownFilterProps) => {
	const dataArray = props.data.map(o => ({
		value: o.id,
		label: o.name
	}))

	if (props.mode === 'multiple') {
		return (
			<div className='flex items-center justify-center flex-col gap-6 flex-4'>
				<InputWrapper label={props.label} flex={1} className='w-full'>
					<MultiSelect
						mt='md'
						comboboxProps={{ withinPortal: true }}
						data={dataArray}
						placeholder='Pick categories'
						classNames={classes}
						className='w-full'
						searchable
						maxValues={5}
						value={props.value}
						onChange={props.onChange}
					/>
				</InputWrapper>
			</div>
		)
	}

	return (
		<div className='flex items-center justify-center flex-col'>
			<InputWrapper label={props.label} flex={1} className='w-full'>
				<Select
					mt='md'
					comboboxProps={{ withinPortal: true }}
					data={dataArray}
					placeholder='Pick one'
					classNames={classes}
					className='w-full'
					searchable
					value={props.value}
					onChange={props.onChange}
				/>
			</InputWrapper>
		</div>
	)
}
