import { Button, Text, Title } from '@mantine/core'
import { IconBrandGithub, IconMailOpened } from '@tabler/icons-react'
import Image from 'next/image'

const AboutMe = () => {
	return (
		<div className='flex flex-col lg:flex-row items-center justify-center pt-36 gap-10 lg:gap-20'>
			<Image
				alt='Profile picture'
				src='/img.jpg'
				width={350}
				height={350}
				className='rounded-full'
			/>

			<div className='max-w-[90%] lg:max-w-[30%] flex items-start flex-col gap-10 lg:gap-20'>
				<Title>Miguel Rabasco</Title>

				<div>
					<Text>
						Hey! I'm Miguel, a Computer (soon-to-become) Engineer which loves to
						learn new things in this computer world. My vision when it comes to
						develop something is to take a different approach than what it is
						normally expected. <br></br>
						<br></br>I like to think laterally and develop solutions that reach
						the same state than the usual method but with that distinctive
						pieces that demonstrate the time it has been spent in, not only this
						project, but all of them.
					</Text>

					<div className='pt-5 flex items-center flex-col gap-5 lg:flex-row justify-between'>
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
