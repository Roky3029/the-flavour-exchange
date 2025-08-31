'use client'

import { Text, Title } from '@mantine/core'
import { IconCircleDot } from '@tabler/icons-react'

interface IngredientsProps {
	ingredients: string[]
}

export default function Ingredients({ ingredients }: IngredientsProps) {
	return (
		<section className='flex items-center justify-center flex-col gap-20'>
			<Title>List of ingredients</Title>

			<section className='flex flex-col justify-center bg-[#383838] gap-10 w-[50%] px-10 py-5 rounded-lg'>
				{ingredients.map((i, idx) => (
					<div key={idx} className='flex items-center gap-4 w-full max-w-full'>
						<IconCircleDot />
						<Text truncate='end' fz={20}>
							{i}
						</Text>
					</div>
				))}
			</section>
		</section>
	)
}
