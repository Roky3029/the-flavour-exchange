import React, { useRef, useState } from 'react'
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react'
import { Button, Group, Text, useMantineTheme } from '@mantine/core'
import {
	Dropzone,
	DropzoneAccept,
	DropzoneIdle,
	DropzoneReject,
	FileWithPath,
	IMAGE_MIME_TYPE
} from '@mantine/dropzone'
import classes from '@/styles/DropzoneButton.module.css'
import { showNotification } from '@/utils/showNotification'
import Image from 'next/image'
import { ControllerRenderProps } from 'react-hook-form'
import { CategoryType, FoodType } from '@/data/typesOfFood'

interface DropzoneProps {
	field: ControllerRenderProps<
		{
			title: string
			tag: FoodType
			imageUrl: string
			steps: string[]
			ingredients: string[]
			etc: number
			categories: CategoryType[]
		},
		| 'title'
		| 'categories'
		| 'etc'
		| 'imageUrl'
		| 'ingredients'
		| 'steps'
		| 'tag'
	>
}

export const DropzoneButton = ({ field }: DropzoneProps) => {
	const theme = useMantineTheme()
	const openRef = useRef<() => void>(null)

	const [file, setFile] = useState<File>()
	const [url, setUrl] = useState('')
	const [uploading, setUploading] = useState(false)

	const uploadFile = async () => {
		try {
			if (!file) {
				showNotification(
					'Cannot upload image',
					'There is no file selected!',
					3000,
					'orange'
				)
				return
			}

			setUploading(true)
			const data = new FormData()
			data.set('file', file)
			const uploadRequest = await fetch('/api/files', {
				method: 'POST',
				body: data
			})

			const signedUrl = await uploadRequest.json()
			setUrl(signedUrl)
			setUploading(false)
			field.onChange(signedUrl)
		} catch (e) {
			console.log(e)
			setUploading(false)
			showNotification(
				'Error!',
				'There has been an error uploading the file!',
				3000,
				'red'
			)
		}
	}

	const handleChange = (e: FileWithPath) => {
		setFile(e)
	}

	return (
		<div className={classes.wrapper}>
			<Dropzone
				openRef={openRef}
				onDrop={e => handleChange(e[0])}
				className={classes.dropzone}
				radius='md'
				accept={IMAGE_MIME_TYPE}
				maxSize={30 * 1024 ** 2}
				disabled={uploading}
				activateOnClick={!Boolean(file)}
			>
				{file && (
					<Button
						variant='subtle'
						style={{ pointerEvents: 'all' }}
						onClick={() => {
							setFile(undefined)
							setUrl('')
						}}
					>
						<IconX size={20} color={theme.colors.red[5]} />
					</Button>
				)}
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
							{file ? (
								<Image
									src={URL.createObjectURL(file)}
									onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
									alt=''
									width={200}
									height={200}
									onClick={() => setFile(undefined)}
								/>
							) : (
								<IconCloudUpload
									size={50}
									stroke={1.5}
									className={classes.icon}
								/>
							)}
						</DropzoneIdle>
					</Group>

					<Text ta='center' fw={700} fz='lg' mt='xl'>
						<DropzoneAccept>Drop files here</DropzoneAccept>
						<DropzoneReject>Images less than 30MB in size</DropzoneReject>
						<DropzoneIdle>{file ? '' : 'Upload image'}</DropzoneIdle>
					</Text>

					<Text className={classes.description} opacity={file ? 0 : 1}>
						Drag&apos;n&apos;drop images here to upload. We can accept only{' '}
						<i>images</i> that are less than 30mb in size.
					</Text>
				</div>
			</Dropzone>

			<Button
				className={url ? classes.controlUploaded : classes.control}
				size='md'
				radius='xl'
				onClick={uploadFile}
				color={url ? 'lime' : 'green'}
				disabled={uploading}
			>
				{uploading ? 'Uploading...' : url ? 'File uploaded!' : 'Upload file'}
			</Button>
		</div>
	)
}
