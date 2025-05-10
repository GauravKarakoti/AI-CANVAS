'use client'

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer"> 
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">AI Canvas</h3>
          <p className="footer-text">
            Empowering creators through AI and blockchain technology
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Quick Links</h4>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/faq" className="footer-link">FAQ</Link>
          <Link href="/terms" className="footer-link">Terms</Link>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Resources</h4>
          <Link href="/docs" className="footer-link">Documentation</Link>
          <Link href="/blog" className="footer-link">Blog</Link>
          <Link href="/status" className="footer-link">System Status</Link>
        </div>

        <div className="footer-section">
          <h4 className="footer-subheading">Connect</h4>
          <div className="social-links">
            <a href="https://x.com/GauravKara_Koti" target="_blank" rel="noopener noreferrer">
              🐦 Twitter
            </a>
            <a href="https://instagram.com/gauravkara_koti" target="_blank" rel="noopener noreferrer">
              🎮 Instagram
            </a>
            <a href="https://github.com/GauravKarakoti" target="_blank" rel="noopener noreferrer">
              💻 GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 AI Canvas. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer {
          background: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          padding: 4rem 2rem 2rem;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-heading {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #818cf8 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .footer-subheading {
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: white;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-bottom {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </footer>
  );
}