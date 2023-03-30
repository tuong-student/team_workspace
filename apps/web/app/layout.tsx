'use client'
import './global.css'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<head>
				<title>Jira</title>
			</head>
			<body className='flex h-screen w-screen flex-col'>
				{children}
			</body>
		</html>
	)
}
