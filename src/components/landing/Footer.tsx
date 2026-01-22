import Image from 'next/image'

interface SocialProps {
	url: string
	src: string
	text: string
	size: number
}

const Social = ({ url, src, text, size }: SocialProps) => {
	return (
		<a
			href={url}
			target='_blank'
			className='flex items-center justify-between gap-2 transition-all text-slate-50 hover:text-slate-400'
		>
			<Image src={src} alt={text} width={size} height={size} />
			<pre>{text}</pre>
		</a>
	)
}

const Footer = () => {
	return (
		<footer className='border-t-4 border-zinc-600 w-full px-10 py-10 mt-auto flex items-center justify-center flex-col text-white gap-5'>
			<div className='flex items-center justify-center gap-5'>
				<Social
					src='/socials/email.png'
					size={20}
					text='mjibarb30@gmail.com'
					url='mailto:mjibarb30@gmail.com'
				/>
				<Social
					src='/socials/github.png'
					size={20}
					text='Roky3029'
					url='https://github.com/Roky3029'
				/>
				<Social
					src='/socials/linkedin.png'
					size={20}
					text='Miguel R.'
					url='https://www.linkedin.com/in/miguel-rabasco-bernab%C3%A9-02a68834b/'
				/>
				<Social
					src='/socials/x.png'
					size={20}
					text='@miguel_rbn'
					url='https://x.com/miguel_rbn'
				/>
			</div>

			<p>Miguel R. &copy; 2026. &emsp; Built with 🩵 in NextJS</p>
		</footer>
	)
}

export default Footer
