// app/providers.tsx
'use client'

import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { base } from 'wagmi/chains'
import { createAppKit } from '@reown/appkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!
const metadata = {
  name: 'LOD Faucet',
  description: 'Claim free LOD tokens',
  url: 'https://yourfaucet.xyz',
  icons: ['https://yourfaucet.xyz/logo.png'],
}

const chains = [base]
const {
  chains: configuredChains,
  provider,
  webSocketProvider,
} = configureChains(chains, [publicProvider()])

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors: [], // connectors will be handled via AppKit
})

createAppKit({
  projectId,
  metadata,
  chains: configuredChains,
  wagmiClient,
  // you may specify adapters or features here per docs
})

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  )
}
