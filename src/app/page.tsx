import HeroImageRight from '@/components/landing/Hero'
import { Navbar } from '@/components/Navbar'
import Features from '@/components/landing/Features'
import Footer from '@/components/landing/Footer'
import AboutMe from '@/components/landing/AboutMe'

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
