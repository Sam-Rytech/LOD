'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { createAppKit } from '@reown/appkit'
import { base } from '@reown/appkit/networks'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
if (!projectId) throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set')

// 1️⃣ Wagmi config
const wagmiConfig = createConfig({
  transports: {
    [base.id]: http('https://mainnet.base.rpc.url'), // Replace with your Base RPC
  },
  chains: [base],
})

// 2️⃣ Initialize AppKit once
createAppKit({
  projectId,
  networks: [base],
  metadata: {
    name: 'LOD Faucet',
    description: 'Claim free LOD tokens on Base',
    url: 'https://yourfaucet.xyz',
    icons: ['https://yourfaucet.xyz/logo.png'],
  },
  adapters: [], // you can use default adapter or wagmiAdapter if needed
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
