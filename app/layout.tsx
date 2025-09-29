import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'LOD Faucet',
  description: 'Claim free LOD tokens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex items-center justify-center">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
