import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { TwitterApi } from "twitter-api-v2"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const client = new TwitterApi(session.accessToken as string)

    const user = await client.v2.me({
      "user.fields": ["public_metrics", "created_at", "description", "profile_image_url"],
    })

    const tweets = await client.v2.userTimeline(user.data.id, {
      exclude: ["retweets", "replies"],
      max_results: 100,
      "tweet.fields": ["public_metrics", "created_at"],
    })

    const followerCount = user.data.public_metrics?.followers_count || 0
    const followingCount = user.data.public_metrics?.following_count || 0
    const tweetCount = user.data.public_metrics?.tweet_count || 0

    const tweetActivityData = {
      labels: tweets.data.data.map((tweet) => new Date(tweet.created_at as string).toLocaleDateString()),
      datasets: [
        {
          label: "Likes",
          data: tweets.data.data.map((tweet) => tweet.public_metrics?.like_count || 0),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "Retweets",
          data: tweets.data.data.map((tweet) => tweet.public_metrics?.retweet_count || 0),
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
      ],
    }

    const engagementRate = calculateEngagementRate(tweets.data.data)

    const data = {
      user: {
        id: user.data.id,
        name: user.data.name,
        username: user.data.username,
        profileImageUrl: user.data.profile_image_url,
        description: user.data.description,
        createdAt: user.data.created_at,
      },
      stats: {
        followerCount,
        followingCount,
        tweetCount,
        engagementRate,
      },
      tweetActivityData,
      recentTweets: tweets.data.data.slice(0, 5).map((tweet) => ({
        id: tweet.id,
        text: tweet.text,
        createdAt: tweet.created_at,
        likes: tweet.public_metrics?.like_count || 0,
        retweets: tweet.public_metrics?.retweet_count || 0,
      })),
      tweets: tweets.data.data,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Twitter data:", error)
    return NextResponse.json({ error: "Failed to fetch Twitter data" }, { status: 500 })
  }
}

function calculateEngagementRate(tweets: any[]) {
  const totalEngagements = tweets.reduce((sum, tweet) => {
    return sum + (tweet.public_metrics?.like_count || 0) + (tweet.public_metrics?.retweet_count || 0)
  }, 0)
  return ((totalEngagements / tweets.length) * 100).toFixed(2)
}

