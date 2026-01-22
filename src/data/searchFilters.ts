export const etcOptions = [
	{
		id: 'less-15min',
		name: 'Less than 15 minutes'
	},
	{
		id: '15-30m',
		name: 'Between 15 and 30 minutes'
	},
	{
		id: '30-60m',
		name: 'Between 30 minutes and 1 hour'
	},
	{
		id: '+1h',
		name: 'More than 1h'
	}
]

export const etcIntegers = {
	'less-15min': {
		min: 0,
		max: 15
	},
	'15-30m': {
		min: 15,
		max: 30
	},
	'30-60m': {
		min: 30,
		max: 60
	},
	'+1h': {
		min: 60,
		max: undefined
	}
}

export const ratingOptions = [
	{
		id: 'min-1',
		name: '1⭐ minimum'
	},
	{
		id: 'min-2',
		name: '2⭐ minimum'
	},
	{
		id: 'min-3',
		name: '3⭐ minimum'
	},
	{
		id: 'min-4',
		name: '4⭐ minimum'
	},
	{
		id: 'min-5',
		name: '5⭐'
	}
]

export const connectionOptions = [
	{
		id: 'everyone',
		name: 'Everyone'
	},
	{
		id: 'following',
		name: 'Only people you are following'
	}
]
