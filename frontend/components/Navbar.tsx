'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [account, setAccount] = useState<string | null>(null);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const connectWallet = async () => {
    if (account) {
      setShowDisconnectModal(true);
      return;
    }
    if (typeof window !== 'undefined' && window.ethereum?.request) {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      console.warn('No window.ethereum.request available');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setShowDisconnectModal(false);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          <div className="logo-container">
            <Image
              src="/Logo.png"                 // same image path
              alt="AI CANVAS Logo"            // descriptive alt text
              width={50}                      // explicit width
              height={50}                     // explicit height
              priority                        // preload this critical image
              className="token-logo"
            />
            <span className="gradient-text">AI Canvas</span>
          </div>
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={()=>{router.push("/mint")}} className="nav-link">Mint</button>
          <button onClick={()=>{router.push("/swap")}} className="nav-link">Swap</button>
          <Link href="/dashboard" className="nav-link">Dashboard</Link>
        </div>

        <button 
          className={`connect-wallet ${account ? 'connected' : ''}`}
          onClick={connectWallet}
        >
          {account ? (
            <>
              <span>{truncateAddress(account)}</span>
              <span className="disconnect-icon">✕</span>
            </>
          ) : (
            'Connect Wallet'
          )}
        </button>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        {showDisconnectModal && (
          <div className="disconnect-modal">
            <div className="modal-content">
              <p>Disconnect wallet?</p>
              <div className="modal-actions">
                <button 
                  onClick={() => setShowDisconnectModal(false)}
                  className="modal-cancel"
                >
                  Cancel
                </button>
                <button 
                  onClick={disconnectWallet}
                  className="modal-confirm"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          background: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          height: 50px;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: white;
        }

        .token-logo {
          border-radius: 50%;
          object-fit: contain;
          display: block;
        }

        .gradient-text {
          background: linear-gradient(90deg, #818cf8 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .connect-wallet {
          background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .connect-wallet:hover {
          opacity: 0.9;
        }

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }

        button:hover {
          cursor: pointer;
        }

        .connect-wallet.connected {
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
        }

        .disconnect-icon {
          font-size: 1.2rem;
          line-height: 1;
          transition: opacity 0.2s;
        }

        .connect-wallet.connected:hover .disconnect-icon {
          opacity: 0.7;
        }

        .disconnect-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;                  /* full viewport width */
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
          max-width: 300px;
          width: 90%;
        }

        .modal-content p {
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .modal-cancel {
          background: #f1f5f9;
          color: #64748b;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
        }

        .modal-confirm {
          background: #ef4444;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: ${isMenuOpen ? 'flex' : 'none'};
            flex-direction: column;
            position: absolute;
            top: 4rem;
            left: 0;
            right: 0;
            background: rgba(31, 41, 55, 0.95);
            padding: 2rem;
            gap: 1.5rem;
          }

          .mobile-menu-button {
            display: block;
          }

          .connect-wallet {
            display: none;
          }

          .connect-wallet.connected {
            display: none;
          }

          .logo-container {
            gap: 0.75rem;
          }
          
          .gradient-text {
            font-size: 1.25rem;
          }
          
          .token-logo {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </nav>
  );
}