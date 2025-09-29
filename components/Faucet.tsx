'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { formatUnits } from 'viem' // to format token decimals
import { Web3Modal } from '@web3modal/react'

import faucetJson from '../abi/FaucetLOD.json'
import tokenJson from '../abi/LonradToken.json'

const faucetABI = faucetJson.abi
const tokenABI = tokenJson.abi

const FAUCET_ADDRESS = '0x8e5771f587d626ac68e962d0582Ed717074567ab'
const TOKEN_ADDRESS = '0xE48A480171E6877a4632c3d588DeC89AAE002800'

export default function Faucet() {
  const { address, isConnected } = useAccount()
  const { writeContract, isPending } = useWriteContract()

  const [drip, setDrip] = useState('0')
  const [cooldown, setCooldown] = useState('0')
  const [balance, setBalance] = useState('0')

  // Read drip amount
  const { data: dripAmount } = useReadContract({
    abi: faucetABI,
    address: FAUCET_ADDRESS,
    functionName: 'dripAmount',
  })

  // Read cooldown
  const { data: cooldownTime } = useReadContract({
    abi: faucetABI,
    address: FAUCET_ADDRESS,
    functionName: 'cooldownTime',
  })

  // Read faucet balance
  const { data: faucetBalance } = useReadContract({
    abi: tokenABI,
    address: TOKEN_ADDRESS,
    functionName: 'balanceOf',
    args: [FAUCET_ADDRESS],
  })

  // Update UI state
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

  // Claim faucet tokens
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

  // Render
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto mt-10">
      {!isConnected ? (
        <div className="flex flex-col items-center">
          <p className="text-gray-500 mb-2">
            Connect wallet to claim LOD tokens
          </p>
          <Web3Modal projectId="f579285fe2d1f128b9a30434426c3a6b" />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
