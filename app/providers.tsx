'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(), // defaults to public RPC
  },
})

// Initialize AppKit once
createAppKit({
  projectId,
  wagmiConfig: config,
  metadata: {
    name: 'LOD Faucet',
    description: 'Claim free LOD tokens',
    url: 'https://yourfaucet.xyz',
    icons: ['https://yourfaucet.xyz/logo.png'],
  },
})

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
