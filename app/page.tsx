import Faucet from '@/components/Faucet'
import ConnectButton from '@/components/ConnectButton'

export default function FaucetPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ConnectButton />
      <Faucet />
    </main>
  )
}
