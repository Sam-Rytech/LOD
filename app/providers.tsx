'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi' // ✅ correct import
import { base } from '@reown/appkit/networks'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
if (!projectId) throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set')

// Initialize Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [base],
  // Removed unsupported 'metadata' property
})

// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  projectId,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
