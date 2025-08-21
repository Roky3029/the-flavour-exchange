import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps
} from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'The Flavour Exchange',
	description: 'All the recipes you could image, here, in a single web'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>

			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<MantineProvider>
					<Notifications />
					{children}
				</MantineProvider>
			</body>
		</html>
	)
}
