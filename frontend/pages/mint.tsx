import { useSimulateContract, useWriteContract } from 'wagmi';
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

  const { data: simulation } = useSimulateContract(contractConfig);
  const { writeContract, isPending, error } = useWriteContract();

  return (
    <div className="mint-container">
      <button
        onClick={() => writeContract(contractConfig)}
        disabled={!simulation?.request || isPending}
        className="mint-button"
      >
        {isPending ? 'Minting...' : 'Mint AI Art Coin'}
      </button>
      
      {error && (
        <div className="error-message">
          Mint failed: {error.message}
        </div>
      )}
    </div>
  )
}
