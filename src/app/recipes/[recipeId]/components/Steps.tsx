'use client'

import { Text, Title } from '@mantine/core'

interface StepsProps {
	steps: string[]
}

export default function Steps({ steps }: StepsProps) {
	return (
		<section className='flex items-center justify-center flex-col gap-20'>
			<Title>Steps</Title>

			<section className='flex flex-col justify-center bg-[#383838] gap-10 w-[100%] px-10 py-5 rounded-lg'>
				{steps.map((i, idx) => (
					<div key={idx} className='flex items-center gap-4'>
						<Text fz={20}>
							{idx + 1}. {i}
						</Text>
					</div>
				))}
			</section>
		</section>
	)
}
