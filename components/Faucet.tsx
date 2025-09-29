'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import faucetABI from '../abi/FaucetLOD.json'
import tokenABI from '../abi/LonradToken.json'

const faucetAddress = '0xYourFaucetContract' // Replace with deployed address
const tokenAddress = '0xYourTokenContract' // Replace with deployed address

export default function Faucet() {
  const { address, isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const [drip, setDrip] = useState('0')
  const [cooldown, setCooldown] = useState('0')
  const [balance, setBalance] = useState('0')

  // Read dripAmount
  const { data: dripAmount } = useReadContract({
    abi: faucetABI,
    address: faucetAddress,
    functionName: 'dripAmount',
  })

  // Read cooldown
  const { data: cooldownTime } = useReadContract({
    abi: faucetABI,
    address: faucetAddress,
    functionName: 'cooldownTime',
  })

  // Read faucet balance
  const { data: faucetBalance } = useReadContract({
    abi: tokenABI,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [faucetAddress],
  })

  useEffect(() => {
    if (dripAmount) setDrip(dripAmount.toString())
    if (cooldownTime) setCooldown(cooldownTime.toString())
    if (faucetBalance) setBalance(faucetBalance.toString())
  }, [dripAmount, cooldownTime, faucetBalance])

  const claim = async () => {
    try {
      await writeContract({
        abi: faucetABI,
        address: faucetAddress,
        functionName: 'claim',
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (!isConnected) {
    return <p className="text-gray-500">Connect wallet to claim LOD tokens</p>
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">LOD Faucet</h2>
      <p>💧 Drip Amount: {drip}</p>
      <p>⏳ Cooldown: {cooldown} sec</p>
      <p>🏦 Faucet Balance: {balance} LOD</p>
      <button
        onClick={claim}
        disabled={isPending}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Claiming...' : 'Claim LOD'}
      </button>
    </div>
  )
}
