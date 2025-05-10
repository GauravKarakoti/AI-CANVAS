from fastapi import FastAPI
from redis import Redis
from transformers import pipeline

app = FastAPI()
r = Redis(host='localhost', port=6379)

# Sentiment Analysis Endpoint
@app.post("/hype-score")
async def get_hype_score(text: str):
    analyzer = pipeline("sentiment-analysis", model="bert-base-uncased")
    result = analyzer(text)[0]
    return {"score": round(result['score'] * 10) if result['label'] == 'POSITIVE' else 1}