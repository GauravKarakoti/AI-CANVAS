import { useState } from 'react'
import { ethers } from 'ethers'
import '../app/globals.css'
import Link from 'next/link'
import Image from 'next/image' // Fixed: Using Next.js Image component

// Declare extended Window interface with proper type
declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider
  }
}

interface QuoteResponse {
  tx: ethers.providers.TransactionRequest
  toTokenAmount: string
  fromTokenAmount: string
}

const ZORA_COIN = {
  chainId: 8453,
  address: process.env.NEXT_PUBLIC_REFERRAL_WALLET,
  name: 'AI Art Coin',
  symbol: 'AIART',
  decimals: 18,
  logoURI: '/Logo.png'
}

export default function SwapPage() {
  const [quote, setQuote] = useState<QuoteResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null) // Moved useState to top level

  const getQuote = async () => {
    setLoading(true)
    setError(null)
    try {
      if (!window.ethereum) throw new Error('Ethereum provider not found')
      
      const response = await fetch(
        `https://api.1inch.io/v5.0/8453/swap?` +
        `fromTokenAddress=${process.env.NEXT_PUBLIC_REFERRAL_WALLET}` +
        `&toTokenAddress=${ZORA_COIN.address}` +
        `&amount=${ethers.utils.parseEther('0.1').toString()}` +
        `&fromAddress=${process.env.NEXT_PUBLIC_REFERRAL_WALLET}` +
        `&slippage=1`
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.description || 'Failed to fetch quote')
      }

      const data: QuoteResponse = await response.json()
      setQuote(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const executeSwap = async () => {
    if (!quote || !window.ethereum) return
    
    try {
      setLoading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const txResponse = await provider.send('eth_sendTransaction', [quote.tx])
      setTxHash(txResponse.hash)
      const receipt = await txResponse.wait()
      console.log(txHash, receipt)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Swap failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="swap-container">
      <div className="swap-card">
        <div className="header">
          <Link href='/'>
            <Image 
              src={ZORA_COIN.logoURI} 
              alt={ZORA_COIN.symbol} 
              width={64}
              height={64}
              className="token-logo"
            />
          </Link>
          <h2>Swap ETH to {ZORA_COIN.symbol}</h2>
        </div>

        <button 
          className={`action-button ${loading ? 'loading' : ''}`}
          onClick={getQuote}
          disabled={loading}
        >
          {loading ? (
            <div className="loader"></div>
          ) : (
            'Get Best Price'
          )}
        </button>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {quote && (
          <div className="swap-details">
            <div className="price-row">
              <span>You&apos;ll receive</span>
              <div className="price-amount">
                {ethers.utils.formatUnits(quote.toTokenAmount, ZORA_COIN.decimals)}
                <span className="token-symbol">{ZORA_COIN.symbol}</span>
              </div>
            </div>

            <button 
              className={`confirm-button ${loading ? 'loading' : ''}`}
              onClick={executeSwap}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="loader small"></div>
                  <span>Confirming...</span>
                </>
              ) : (
                'Confirm Swap'
              )}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .swap-container {
          display: flex;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          background: #f8fafc;
        }

        .swap-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          width: 100%;
          max-width: 420px;
          transition: transform 0.2s;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .token-logo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          justify-self: center;
        }

        h2 {
          color: #1e293b;
          font-size: 1.5rem;
          margin: 0;
        }

        .action-button {
          width: 100%;
          padding: 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }

        .action-button:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .action-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .swap-details {
          margin-top: 2rem;
          padding: 1.5rem;
          background: #f1f5f9;
          border-radius: 12px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .price-amount {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .token-symbol {
          color: #64748b;
          font-size: 1rem;
        }

        .confirm-button {
          width: 100%;
          padding: 1rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }

        .confirm-button:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-1px);
        }

        .error-message {
          margin-top: 1rem;
          padding: 1rem;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 8px;
          border: 1px solid #fca5a5;
        }

        .loader {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        .loader.small {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .swap-container {
            padding: 1rem;
          }
          
          .swap-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}