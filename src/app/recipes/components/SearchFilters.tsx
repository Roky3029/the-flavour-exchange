'use client'

import { Button, TextInput, useMantineTheme } from '@mantine/core'
import {
	IconFilter,
	IconMinus,
	IconPlus,
	IconSearch
} from '@tabler/icons-react'
import { DropdownFilter } from './DropdownFilter'
import { CATEGORIES_ICONS, TYPES_OF_FOOD_ICONS } from '@/data/FoodIcons'
import { Dispatch, SetStateAction, useState } from 'react'
import {
	connectionOptions,
	etcOptions,
	ratingOptions
} from '@/data/searchFilters'
import { Filters } from '@/types/filters'

interface SearchFiltersProps {
	filters: Filters
	setFilters: Dispatch<SetStateAction<Filters>>
	handleSearch: () => void
}

export default function SearchFilters({
	filters,
	setFilters,
	handleSearch
}: SearchFiltersProps) {
	const [showMoreFilters, setShowMoreFilters] = useState(false)
	const theme = useMantineTheme()

	return (
		<>
			<div className='flex items-end justify-center w-full gap-10 px-40'>
				<TextInput
					radius='xl'
					size='sm'
					placeholder='Search for a recipe'
					leftSection={<IconSearch size={18} stroke={1.5} />}
					flex={4}
					value={filters.text}
					onChange={e => setFilters({ ...filters, text: e.target.value })}
				/>
				<DropdownFilter
					label='Type of food'
					data={TYPES_OF_FOOD_ICONS}
					value={filters.type}
					onChange={val => setFilters({ ...filters, type: val as string })}
				/>
				<DropdownFilter
					label='Categories'
					data={CATEGORIES_ICONS}
					mode='multiple'
					value={filters.categories}
					onChange={vals => setFilters({ ...filters, categories: vals })}
				/>
				<Button
					variant='outline'
					onClick={() => setShowMoreFilters(!showMoreFilters)}
					color={theme.colors.green[8]}
				>
					{showMoreFilters ? <IconMinus stroke={2} /> : <IconPlus stroke={2} />}
					<IconFilter stroke={2} />
				</Button>
			</div>
			{showMoreFilters && (
				<div className='flex items-end justify-center w-full gap-10 px-40'>
					<DropdownFilter
						label='Estimeted Time of Cooking'
						data={etcOptions}
						value={filters.etc}
						onChange={e => setFilters({ ...filters, etc: e as string })}
					/>
					<DropdownFilter
						label='Rating'
						data={ratingOptions}
						value={filters.rating}
						onChange={e => setFilters({ ...filters, rating: e as string })}
					/>
					<DropdownFilter
						label='Connection'
						data={connectionOptions}
						value={filters.connection}
						onChange={e => setFilters({ ...filters, connection: e as string })}
					/>
				</div>
			)}

			<Button
				color={theme.colors.green[8]}
				leftSection={<IconSearch stroke={2} />}
				onClick={() => handleSearch()}
			>
				Search
			</Button>
		</>
	)
}
