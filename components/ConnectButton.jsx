'use client'

import { useAccount } from 'wagmi'

export default function ConnectButton() {
  const { address, isConnected } = useAccount()

  return (
    <div className="flex items-center gap-2">
      <w3m-button />
      {isConnected && (
        <span className="text-sm text-gray-500">
          Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      )}
    </div>
  )
}
