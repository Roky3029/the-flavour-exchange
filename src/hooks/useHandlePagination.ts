'use client'

import { useState } from 'react'

export const useHandlePagination = () => {
	const [iteration, setIteration] = useState(1) // We will look for iteration * LIMIT_PER_SEARCH results on every query
	const [totalNumber, setTotalNumber] = useState(0)
	const [paginationDisabled, setPaginationDisabled] = useState(true)

	const handleIteration = () => {
		setIteration(iteration + 1)
	}

	return {
		iteration,
		handleIteration,
		totalNumber,
		setTotalNumber,
		paginationDisabled,
		setPaginationDisabled
	}
}
