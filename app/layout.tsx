// app/layout.tsx
import type { Metadata } from 'next'
// Make sure app/providers.tsx exists, or update the path if needed
import { Providers } from '@/app/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'LOD Faucet',
  description: 'Claim free LOD tokens on Base',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
