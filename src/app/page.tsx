import HeroImageRight from '@/components/landing/Hero'
import { Navbar } from '@/components/Navbar'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import AboutMe from '@/components/AboutMe'

export default function Home() {
	return (
		<>
			<Navbar />
			<HeroImageRight />

			<AboutMe />

			<Features />

			<Footer />
		</>
	)
}
