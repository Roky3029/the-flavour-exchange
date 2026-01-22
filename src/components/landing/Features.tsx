import FeatureCard from './FeatureCard'

const Features = () => {
	return (
		<div className='flex items-center justify-center pb-36'>
			<div className='grid grid-cols-2 px-20 pt-36 max-w-[70%] place-content-center gap-20'>
				<FeatureCard
					src='/placeholder.png'
					title='Some placeholder title'
					description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fugit assumenda, atque officiis iusto qui ipsam veritatis quidem quisquam, obcaecati natus, id aspernatur magnam facilis quae nulla dignissimos voluptates doloribus? Autem aspernatur accusantium distinctio a recusandae in unde aperiam. Voluptatibus, delectus? Necessitatibus non tenetur obcaecati labore ipsam sint quisquam aliquam?'
				/>
				<FeatureCard
					src='/placeholder.png'
					title='Some placeholder title'
					description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fugit assumenda, atque officiis iusto qui ipsam veritatis quidem quisquam, obcaecati natus, id aspernatur magnam facilis quae nulla dignissimos voluptates doloribus? Autem aspernatur accusantium distinctio a recusandae in unde aperiam. Voluptatibus, delectus? Necessitatibus non tenetur obcaecati labore ipsam sint quisquam aliquam?'
				/>
				<FeatureCard
					src='/placeholder.png'
					title='Some placeholder title'
					description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fugit assumenda, atque officiis iusto qui ipsam veritatis quidem quisquam, obcaecati natus, id aspernatur magnam facilis quae nulla dignissimos voluptates doloribus? Autem aspernatur accusantium distinctio a recusandae in unde aperiam. Voluptatibus, delectus? Necessitatibus non tenetur obcaecati labore ipsam sint quisquam aliquam?'
				/>
				<FeatureCard
					src='/placeholder.png'
					title='Some placeholder title'
					description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fugit assumenda, atque officiis iusto qui ipsam veritatis quidem quisquam, obcaecati natus, id aspernatur magnam facilis quae nulla dignissimos voluptates doloribus? Autem aspernatur accusantium distinctio a recusandae in unde aperiam. Voluptatibus, delectus? Necessitatibus non tenetur obcaecati labore ipsam sint quisquam aliquam?'
				/>
			</div>
		</div>
	)
}

export default Features
