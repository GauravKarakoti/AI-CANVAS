import os
import requests
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

load_dotenv()

class CoinAPI:
    def __init__(self):
        self.base_url = os.getenv("API_URL", "http://localhost:8000")
        
    async def get_trending_coins(self):
        return [
            {"symbol": "AIART", "price": "0.45", "change": "12.5"},
            {"symbol": "NFTGEN", "price": "0.32", "change": "8.2"},
            {"symbol": "DALLE", "price": "0.78", "change": "5.6"}
        ]

coin_api = CoinAPI()

async def trending_coins(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        coins = await coin_api.get_trending_coins()
        if not coins:
            await update.message.reply_text("⚠️ Could not fetch trending coins at this time")
            return
            
        message = "🚀 Top Trending AI Art Coins:\n\n" + "\n".join(
            f"• {coin['symbol']}: ${coin['price']} (+{coin['change']}%)" 
            for coin in coins[:5]  # Show top 5
        )
        await update.message.reply_text(message)
        
    except Exception as e:
        print(f"Error in trending_coins: {e}")
        await update.message.reply_text("❌ Error fetching trending coins")

async def alert(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        if not context.args:
            await update.message.reply_text("Please specify a coin symbol\nUsage: /alert <COIN>")
            return
            
        coin = context.args[0].upper()
        # Implement your alert logic here
        await update.message.reply_text(f"🔔 Alert set for {coin}! We'll notify you of significant price changes.")
        
    except Exception as e:
        print(f"Error in set_alert: {e}")
        await update.message.reply_text("❌ Error setting alert")

def main():
    token = os.getenv("TELEGRAM_TOKEN")
    if not token:
        raise ValueError("TELEGRAM_TOKEN environment variable not set")
        
    app = Application.builder().token(token).build()
    
    # Add handlers
    app.add_handler(CommandHandler("trending_coins", trending_coins))
    app.add_handler(CommandHandler("alert", alert))
    
    # Add error handler
    app.add_error_handler(error_handler)
    
    print("🤖 Bot is running...")
    app.run_polling()

async def error_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    print(f"⚠️ Error: {context.error}")
    if update.message:
        await update.message.reply_text("❌ An error occurred. Please try again later.")

if __name__ == "__main__":
    main()