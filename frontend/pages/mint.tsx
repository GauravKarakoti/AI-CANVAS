// import { useSimulateContract, useWriteContract } from 'wagmi';
import { base } from 'viem/chains'
import {
  zoraCreator1155FactoryImplABI,
  zoraCreator1155FactoryImplAddress
} from "@zoralabs/protocol-deployments"

// Validate environment variable at component level
if (!process.env.NEXT_PUBLIC_REFERRAL_WALLET) {
  throw new Error('NEXT_PUBLIC_REFERRAL_WALLET environment variable is required');
}
const referralWallet = process.env.NEXT_PUBLIC_REFERRAL_WALLET as `0x${string}`;

export default function MintPage() {
  const contractConfig = {
    address: zoraCreator1155FactoryImplAddress[base.id], 
    abi: zoraCreator1155FactoryImplABI as typeof zoraCreator1155FactoryImplABI, // Type assertion for ABI
    functionName: "mintWithRewards" as const, // Literal type assertion
    args: [
      referralWallet, // recipient
      1n, // tokenId
      1n, // quantity
      "0x", // minterData
      "0x0000000000000000000000000000000000000000", // mintReferral
      {
        royaltyRecipient: referralWallet,
        royaltyBps: 500n,
        payoutRecipient: referralWallet
      }
    ] as const, // Critical 'as const' for tuple preservation
    value: 777_000_000_000_000n,
    chainId: base.id,
    account: referralWallet // Required sender address
  };
  
  // const { data: simulation } = useSimulateContract(contractConfig);
  // const { writeContract, isPending, error } = useWriteContract();
  console.log(contractConfig)

  return (
    <div className="mint-container">
      <div className="mint-card">
        <div className="header">
          <h2>Create AI Art Coin</h2>
          <p className="description">
            Mint your AI-generated artwork as a ZORA 1155 token
          </p>
        </div>

        <button
          className={`mint-button`}
          // onClick={() => writeContract(contractConfig)}
          // disabled={!simulation?.request || isPending}
        >
          {/* {isPending ? 'Minting...' : 'Mint AI Art Coin'} */}
          Mint AI Art Coin
          <span className="fee-disclaimer">(0.000777 ETH fee)</span>
        </button>

        {/* error &&  */}
        <div className="error-message">
          Mint failed: {
            // error.message
          }
          Error placeholder
        </div>
      </div>

      <style jsx>{`
        .mint-container {
          display: flex;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          background: #f8fafc;
        }

        .mint-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          width: 100%;
          max-width: 420px;
          text-align: center;
        }

        .header {
          margin-bottom: 2rem;
        }

        h2 {
          color: #1e293b;
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
        }

        .description {
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        .mint-button {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .mint-button:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .mint-button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }

        .fee-disclaimer {
          display: block;
          font-size: 0.8rem;
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .error-message {
          margin-top: 1rem;
          padding: 1rem;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 8px;
          border: 1px solid #fca5a5;
        }

        .loading {
          cursor: wait;
          opacity: 0.7;
        }

        @media (max-width: 480px) {
          .mint-container {
            padding: 1rem;
          }
          
          .mint-card {
            padding: 1.5rem;
          }
          
          h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  )
}
