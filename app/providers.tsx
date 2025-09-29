'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { createAppKit } from '@reown/appkit'
// Update the import path to the correct location for wagmiAdapter
import { wagmiAdapter } from '@reown/appkit
import { base } from '@reown/appkit/networks'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
if (!projectId) throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set')

// Wagmi config
const wagmiConfig = createConfig({
  connectors: [], // optional, AppKit adapter handles this
  transports: {
    [base.id]: http('https://base-rpc-url-here'), // replace with real Base RPC
  },
  chains: [base],
})

// Initialize AppKit
createAppKit({
  projectId,
  networks: [base],
  adapters: [wagmiAdapter()],
  metadata: {
    name: 'LOD Faucet',
    description: 'Claim free LOD tokens on Base',
    url: 'https://yourfaucet.xyz',
    icons: ['https://yourfaucet.xyz/logo.png'],
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
