'use client'

import { Button } from '@mantine/core'

interface MoreResultsButtonInterface {
	handleIteration: () => void
}

export default function MoreResultsButton({
	handleIteration
}: MoreResultsButtonInterface) {
	return (
		<Button onClick={handleIteration} className='col-2' color='cyan'>
			More results
		</Button>
	)
}
