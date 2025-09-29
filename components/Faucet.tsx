'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { formatUnits } from 'viem'

import faucetJson from '../abi/FaucetLOD.json'
import tokenJson from '../abi/LonradToken.json'
import ConnectButton from './ConnectButton'

const FAUCET_ADDRESS = '0x8e5771f587d626ac68e962d0582Ed717074567ab'
const TOKEN_ADDRESS = '0xE48A480171E6877a4632c3d588DeC89AAE002800'

const faucetABI = faucetJson.abi
const tokenABI = tokenJson.abi

export default function Faucet() {
  const { address, isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const [drip, setDrip] = useState('0')
  const [cooldown, setCooldown] = useState('0')
  const [balance, setBalance] = useState('0')

  const { data: dripAmount } = useReadContract({
    abi: faucetABI,
    address: FAUCET_ADDRESS,
    functionName: 'dripAmount',
  })

  const { data: cooldownTime } = useReadContract({
    abi: faucetABI,
    address: FAUCET_ADDRESS,
    functionName: 'cooldownTime',
  })

  const { data: faucetBalance } = useReadContract({
    abi: tokenABI,
    address: TOKEN_ADDRESS,
    functionName: 'balanceOf',
    args: [FAUCET_ADDRESS],
  })

  useEffect(() => {
    if (typeof dripAmount === 'string' || typeof dripAmount === 'number' || typeof dripAmount === 'bigint') {
      setDrip(formatUnits(BigInt(dripAmount), 18))
    }
    if (typeof cooldownTime === 'string' || typeof cooldownTime === 'number' || typeof cooldownTime === 'bigint') {
      setCooldown(cooldownTime.toString())
    }
    if (typeof faucetBalance === 'string' || typeof faucetBalance === 'number' || typeof faucetBalance === 'bigint') {
      setBalance(formatUnits(BigInt(faucetBalance), 18))
    }
  }, [dripAmount, cooldownTime, faucetBalance])

  const claim = async () => {
    try {
      await writeContract({
        abi: faucetABI,
        address: FAUCET_ADDRESS,
        functionName: 'claim',
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (!isConnected) return <ConnectButton />

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">LOD Faucet</h2>
      <p>💧 Drip Amount: {drip} LOD</p>
      <p>⏳ Cooldown: {cooldown} sec</p>
      <p>🏦 Faucet Balance: {balance} LOD</p>
      <p className="text-gray-700 mt-2 break-all text-sm">
        Connected: {address}
      </p>
      <button
        onClick={claim}
        disabled={isPending}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Claiming...' : 'Claim LOD'}
      </button>
    </div>
  )
}
