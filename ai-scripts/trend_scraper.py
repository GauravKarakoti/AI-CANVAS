import os
os.environ['REQUESTS_CA_BUNDLE'] = r'cacert.pem'

import tweepy
from dotenv import load_dotenv

load_dotenv()

client = tweepy.Client(bearer_token=os.getenv('TWITTER_BEARER_TOKEN'))
proxies = {
    'http': 'http://10.10.1.10:3128',
    'https': 'http://10.10.1.10:1080',
}

def scrape_trends():
    response = client.search_recent_tweets(
        "AI art",
        max_results=100,
        tweet_fields=['created_at']
    )
    print("Done")
    return [tweet.text for tweet in response.data]

if __name__ == "__main__":
    tweets=scrape_trends()
    f=open('tweets.txt','w+')
    for i in tweets:
        f.write(f'{i}\n')
    f.close()