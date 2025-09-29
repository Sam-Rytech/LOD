// app/providers.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { createAppKit } from '@reown/appkit'
import { base } from '@reown/appkit/networks' // import network from AppKit’s networks

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!
if (!projectId) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set')
}

// 1. Create wagmi config
const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http('https://base-rpc-url-here'), // your RPC URL or public provider
  },
})

// 2. Initialize AppKit
createAppKit({
  adapters: [
    /* e.g. default adapter provided by AppKit or a specific adapter */
  ],
  projectId,
  networks: [base], // **this is required** per the error you got
  metadata: {
    name: 'LOD Faucet',
    description: 'Claim free LOD tokens',
    url: 'https://yourfaucet.xyz',
    icons: ['https://yourfaucet.xyz/logo.png'],
  },
  // you can also pass `features` or other options if needed
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
