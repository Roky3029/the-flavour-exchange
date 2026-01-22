import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL(`https://${process.env.PINATA_URL}/**`)]
	}
}

export default nextConfig
