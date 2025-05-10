'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (
      typeof window !== 'undefined' &&
      window.ethereum &&
      typeof window.ethereum.request === 'function'
    ) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } else {
      console.warn('No window.ethereum.request available');
    }
  };
  console.log(account)

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          <div className="logo-container">
            <Image
              src="/logo.png"                 // same image path
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
          className="connect-wallet"
          onClick={() => connectWallet()}
        >
          Connect Wallet
        </button>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
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