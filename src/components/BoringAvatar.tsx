import Avatar from 'boring-avatars'

interface BoringAvatarProps {
	name: string
	size?: number
}

export function BoringAvatar({ name, size }: BoringAvatarProps) {
	return (
		<Avatar
			name={name}
			colors={['#6da67a', '#77b885', '#86c28b', '#859987', '#4a4857']}
			variant='beam'
			size={size ? size : 40}
		/>
	)
}
