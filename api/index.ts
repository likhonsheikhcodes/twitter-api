import express from "express"
import { TwitterApi } from "twitter-api-v2"

const app = express()

// Twitter API authentication
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY as string,
  appSecret: process.env.TWITTER_API_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
  accessSecret: process.env.TWITTER_ACCESS_SECRET as string,
})

// Middleware to parse JSON bodies
app.use(express.json())

// Route to post a tweet
app.post("/api/tweet", async (req, res) => {
  try {
    const { tweet } = req.body

    // Implement rate limiting
    // This is a simple example. In a production environment, you'd want to use a more robust solution.
    const tweetCount = await client.v2.tweetCount("from:" + process.env.TWITTER_USERNAME)
    if (tweetCount.data.tweet_count > 5) {
      // Limit to 5 tweets per day
      return res.status(429).json({ error: "Rate limit exceeded. Try again tomorrow." })
    }

    // Post the tweet
    const result = await client.v2.tweet(tweet)
    res.json({ success: true, data: result.data })
  } catch (error) {
    console.error("Error posting tweet:", error)
    res.status(500).json({ error: "Failed to post tweet" })
  }
})

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" })
})

export default app

