'use client'

import { ReactNode } from 'react';

interface ButtonProps { 
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button'
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant} ${className}`}
    >
      {children}
      <style jsx>{`
        .button {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .primary {
          background: linear-gradient(90deg, #6366f1 0%, #3b82f6 100%);
          border: none;
          color: white;
        }
        
        .primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        .outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .outline:hover {
          border-color: rgba(255, 255, 255, 0.4);
          color: white;
        }
      `}</style>
    </button>
  );
}