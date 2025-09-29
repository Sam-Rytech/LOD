import ConnectButton from '../components/ConnectButton'
import Faucet from '../components/Faucet'

export default function Page() {
  return (
    <main className="flex flex-col gap-6 items-center justify-center py-10">
      <ConnectButton />
      <Faucet />
    </main>
  )
}
