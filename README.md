# AI Canvas  
**Tokenize & Trade AI-Generated Art on Zora**  
[![Powered by Zora](https://img.shields.io/badge/Powered_by-Zora_Coins_Protocol-blue)](https://docs.zora.co/coins)  

## Overview  
AI Canvas lets creators turn AI-generated art into tradable ERC-20 coins in seconds, while traders leverage AI insights to spot trends. Built on Zora’s Coins Protocol and enhanced with real-time AI analytics.  

## Features  
- 🎨 Generate AI art with Stable Diffusion/RunwayML.  
- 💰 Mint as ERC-20 coins (10% creator allocation).  
- 📈 AI-driven trend prediction and portfolio alerts.  
- 💬 Discord/Telegram bots for real-time trading signals.  

## Installation  
1. Clone the repo:  
   ```bash  
   git clone https://github.com/GauravKarakoti/ai-canvas.git
   ```
2. Install dependencies:
  ```bash
  cd ai-canvas && npm install
  ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```

## Usage
1. Generate Art: Enter a prompt (e.g., "cyberpunk cat") and generate an image.
2. Mint a Coin: Add a $ticker and description, then mint via Zora SDK.
3. Trade: Buy/sell coins on the Uniswap interface.
4. AI Insights: View predictions for your portfolio.

## Tech Stack
- Zora Coins SDK
- Stable Diffusion API
- React + Vite
- Firebase (Alerts)
- Base Network
