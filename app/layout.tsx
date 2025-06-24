import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Users Posts',
  description: 'A simple app to view users posts',
  generator: 'Alana Rocha',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

