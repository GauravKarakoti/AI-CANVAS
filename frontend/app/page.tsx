'use client'

import Link from 'next/link';
import Button from '@/components/ui/Button';
// import { SwapWidget, Theme, TokenInfo } from '@uniswap/widgets'

// const theme: Theme = {
//   primary: '#6366f1',  // Indigo
//   secondary: '#3b82f6', // Blue
//   interactive: '#4f46e5',
//   container: '#1f2937',
//   module: '#374151',
//   accent: '#60a5fa',
//   outline: '#4b5563',
// }

// const ZORA_COIN: TokenInfo = {
//   chainId: 8453, // Base chain ID
//   address: '0xYOUR_ZORA_COIN_ADDRESS', 
//   name: 'AI Art Coin', // Required string 
//   symbol: 'AIART', // Required string
//   decimals: 18,
//   logoURI: 'https://raw.githubusercontent.com/uniswap/assets/master/blockchains/base/assets/0x.../logo.png'
// }

// const tokenList: TokenInfo[] = [ZORA_COIN]

export default function Home() { 
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-6xl font-bold gradient-text">
          Transform AI Art into Tradable Coins
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Generate, tokenize, and trade AI-generated artwork in seconds using Zora&apos;s Coins Protocol
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/mint">
            <Button className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 text-lg">
              Create AI Art
            </Button>
          </Link>
          <Link href="/swap">
            <Button variant="outline" className="px-8 py-4 text-lg" >
              Swap Art
            </Button>
          </Link>
        </div>
      </section>

      {/* Trading Widget Section */}
      {/* <section className="max-w-4xl mx-auto">
        <div className="card-gradient rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Live Trading</h2>
          <div className="h-[400px]">
          <SwapWidget
            jsonRpcUrlMap={process.env.NEXT_PUBLIC_BASE_RPC}
            defaultChainId={8453}  
            tokenList={tokenList}
            width="100%"
            theme={theme}
            convenienceFee={0}
            defaultInputTokenAddress="NATIVE"
            defaultOutputTokenAddress={ZORA_COIN.address}
          />
          </div>
        </div>
      </section> */}

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="card-gradient p-6 rounded-xl space-y-4">
          <div className="h-12 w-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
            🎨
          </div>
          <h3 className="text-xl font-semibold">AI Generation</h3>
          <p className="text-gray-300">
            Create unique artwork using Stable Diffusion and RunwayML
          </p>
        </div>
        
        <div className="card-gradient p-6 rounded-xl space-y-4">
          <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
            💎
          </div>
          <h3 className="text-xl font-semibold">Instant Tokenization</h3>
          <p className="text-gray-300">
            Mint your art as ERC-20 coins in seconds with Zora Protocol
          </p>
        </div>

        <div className="card-gradient p-6 rounded-xl space-y-4">
          <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            📈
          </div>
          <h3 className="text-xl font-semibold">Smart Trading</h3>
          <p className="text-gray-300">
            Trade coins with AI-powered insights and real-time alerts
          </p>
        </div>
      </section>
    </div>
  );
}