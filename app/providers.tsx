// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { createAppKit, WagmiAdapter } from '@reown/appkit'

// Query client for react-query
const queryClient = new QueryClient()

// 1. Create wagmi config
const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http('https://mainnet.base.org'), // your RPC here
  },
})

// 2. Create wagmi adapter for AppKit
const wagmiAdapter = new WagmiAdapter({
  wagmiConfig,
})

// 3. Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  metadata: {
    name: 'Base Faucet DApp',
    description: 'Simple faucet on Base Mainnet',
    url: 'https://yourdapp.com',
    icons: ['https://yourdapp.com/icon.png'],
  },
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // from WalletConnect Cloud
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
