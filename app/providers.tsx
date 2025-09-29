'use client'

import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit, defaultWagmiConfig } from '@reown/appkit'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID! // from WalletConnect Cloud
const metadata = {
  name: 'LOD Faucet',
  description: 'Claim free LOD tokens',
  url: 'https://yourfaucet.xyz',
  icons: ['https://yourfaucet.xyz/logo.png'],
}

const chains = [base]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createAppKit({ adapters: [wagmiConfig], projectId, metadata })

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
