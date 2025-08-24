import { useRef } from 'react'
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react'
import { Button, Group, Text, useMantineTheme } from '@mantine/core'
import {
	Dropzone,
	DropzoneAccept,
	DropzoneIdle,
	DropzoneReject,
	MIME_TYPES
} from '@mantine/dropzone'
import classes from '@/styles/DropzoneButton.module.css'

export const DropzoneButton = () => {
	const theme = useMantineTheme()
	const openRef = useRef<() => void>(null)

	return (
		<div className={classes.wrapper}>
			<Dropzone
				openRef={openRef}
				onDrop={() => {}}
				className={classes.dropzone}
				radius='md'
				accept={[MIME_TYPES.pdf]}
				maxSize={30 * 1024 ** 2}
			>
				<div style={{ pointerEvents: 'none' }}>
					<Group justify='center'>
						<DropzoneAccept>
							<IconDownload
								size={50}
								color={theme.colors.lime[6]}
								stroke={1.5}
							/>
						</DropzoneAccept>
						<DropzoneReject>
							<IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
						</DropzoneReject>
						<DropzoneIdle>
							<IconCloudUpload
								size={50}
								stroke={1.5}
								className={classes.icon}
							/>
						</DropzoneIdle>
					</Group>

					<Text ta='center' fw={700} fz='lg' mt='xl'>
						<DropzoneAccept>Drop files here</DropzoneAccept>
						<DropzoneReject>Images less than 30MB in size</DropzoneReject>
						<DropzoneIdle>Upload image</DropzoneIdle>
					</Text>

					<Text className={classes.description}>
						Drag&apos;n&apos;drop images here to upload. We can accept only{' '}
						<i>images</i> that are less than 30mb in size.
					</Text>
				</div>
			</Dropzone>

			<Button
				className={classes.control}
				size='md'
				radius='xl'
				onClick={() => openRef.current?.()}
				color='green'
			>
				Select files
			</Button>
		</div>
	)
}
