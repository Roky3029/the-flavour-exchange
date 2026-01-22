import { Button, Text, Title } from '@mantine/core'
import { IconBrandGithub, IconMailOpened } from '@tabler/icons-react'
import Image from 'next/image'

const AboutMe = () => {
	return (
		<div className='flex items-center justify-center pt-36 gap-20'>
			<Image
				alt='Profile picture'
				src='/img.jpg'
				width={400}
				height={400}
				className='rounded-full'
			/>

			<div className='max-w-[30%] flex items-start flex-col gap-20'>
				<Title>Miguel Rabasco</Title>

				<div>
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, natus
						nostrum asperiores nobis repellendus laboriosam rem dignissimos
						veniam dolor consectetur? Error maiores nisi id corrupti qui
						officiis eos dolorem adipisci soluta neque? Sed quasi nisi sint
						deserunt alias rem in, pariatur reiciendis, consequatur illum a
						optio voluptatum dolorem illo. Nemo!
					</Text>

					<div className='pt-5 flex items-center justify-between'>
						<Button
							component='a'
							href='https://github.com/Roky3029'
							target='_blank'
							color='teal'
							leftSection={<IconBrandGithub />}
						>
							Github profile
						</Button>

						<Button
							component='a'
							href='mailto:mjibarb30@gmail.com'
							target='_blank'
							color='cyan'
							leftSection={<IconMailOpened />}
						>
							Say Hi👋🏻 via Email
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AboutMe
