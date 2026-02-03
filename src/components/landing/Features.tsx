import FeatureCard from './FeatureCard'
import { features } from '@/data/features'

const Features = () => {
	return (
		<div className='flex items-center justify-center pb-36'>
			<div className='grid grid-cols-1 xl:grid-cols-2 px-5 lg:px-20 pt-36 w-full md:max-w-[90%] lg:max-w-[70%] place-content-center gap-20'>
				{features.map((ft, i) => (
					<FeatureCard
						src={`./features/${ft.imageSrc}`}
						title={ft.title}
						description={ft.description}
						key={i}
					/>
				))}
			</div>
		</div>
	)
}

export default Features
