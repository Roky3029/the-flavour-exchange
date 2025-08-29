export const formatMinutes = (etc: number) => {
	if (etc < 60) return `${etc}m`

	const hours = Math.floor(etc / 60)
	const minutes = etc % 60

	return `${hours}h ${minutes}m`
}
