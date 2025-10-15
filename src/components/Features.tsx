import { Card, CardSection, Text, Title } from '@mantine/core'
import { Image } from '@mantine/core'
import classes from '@/styles/BadgeCard.module.css'

const Features = () => {
	return (
		<div className='flex items-center justify-center pb-36'>
			<div className='grid grid-cols-2 px-20 pt-36 max-w-[70%] place-content-center gap-20'>
				<Card withBorder radius='md' p='md' className={classes.card}>
					<CardSection>
						<div className='h-[100px] md:h-[200px] xl:h-[300px] overflow-hidden'>
							<Image
								src={'/placeholder.png'}
								alt={'placeholder'}
								height={180}
								fit='cover'
							/>
						</div>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Title order={4}>Some placeholder title</Title>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
							fuga perferendis officia sunt rem tenetur, eos a? Asperiores unde
							nihil ipsum commodi culpa accusamus, debitis vitae expedita ex sit
							repudiandae amet error minima odio, architecto saepe obcaecati
							veritatis dignissimos neque dolorem quaerat harum doloremque,
							omnis reprehenderit! Voluptatibus ea ratione vero?
						</Text>
					</CardSection>
				</Card>

				<Card withBorder radius='md' p='md' className={classes.card}>
					<CardSection>
						<div className='h-[100px] md:h-[200px] xl:h-[300px] overflow-hidden'>
							<Image
								src={'/placeholder.png'}
								alt={'placeholder'}
								height={180}
								fit='cover'
							/>
						</div>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Title order={4}>Some placeholder title</Title>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
							fuga perferendis officia sunt rem tenetur, eos a? Asperiores unde
							nihil ipsum commodi culpa accusamus, debitis vitae expedita ex sit
							repudiandae amet error minima odio, architecto saepe obcaecati
							veritatis dignissimos neque dolorem quaerat harum doloremque,
							omnis reprehenderit! Voluptatibus ea ratione vero?
						</Text>
					</CardSection>
				</Card>

				<Card withBorder radius='md' p='md' className={classes.card}>
					<CardSection>
						<div className='h-[100px] md:h-[200px] xl:h-[300px] overflow-hidden'>
							<Image
								src={'/placeholder.png'}
								alt={'placeholder'}
								height={180}
								fit='cover'
							/>
						</div>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Title order={4}>Some placeholder title</Title>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
							fuga perferendis officia sunt rem tenetur, eos a? Asperiores unde
							nihil ipsum commodi culpa accusamus, debitis vitae expedita ex sit
							repudiandae amet error minima odio, architecto saepe obcaecati
							veritatis dignissimos neque dolorem quaerat harum doloremque,
							omnis reprehenderit! Voluptatibus ea ratione vero?
						</Text>
					</CardSection>
				</Card>

				<Card withBorder radius='md' p='md' className={classes.card}>
					<CardSection>
						<div className='h-[100px] md:h-[200px] xl:h-[300px] overflow-hidden'>
							<Image
								src={'/placeholder.png'}
								alt={'placeholder'}
								height={180}
								fit='cover'
							/>
						</div>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Title order={4}>Some placeholder title</Title>
					</CardSection>

					<CardSection className={classes.section} mt='md'>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
							fuga perferendis officia sunt rem tenetur, eos a? Asperiores unde
							nihil ipsum commodi culpa accusamus, debitis vitae expedita ex sit
							repudiandae amet error minima odio, architecto saepe obcaecati
							veritatis dignissimos neque dolorem quaerat harum doloremque,
							omnis reprehenderit! Voluptatibus ea ratione vero?
						</Text>
					</CardSection>
				</Card>
			</div>
		</div>
	)
}

export default Features
