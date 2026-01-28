import { BoringAvatar } from '@/components/BoringAvatar'
import { Title } from '@mantine/core'
import Link from 'next/link'

interface UserEntryProps {
	name: string
	userId: string
}

export default function UserEntry({ name, userId }: UserEntryProps) {
	return (
		<Link
			href={`/user/${userId}`}
			className='w-full flex items-center gap-5 border-2 border-zinc-900 bg-zinc-800 px-3 py-2 rounded-lg'
		>
			<BoringAvatar name={name} />

			<Title order={3} c='gray'>
				{name}
			</Title>
		</Link>
	)
}
