import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { TwitterApi } from "twitter-api-v2"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { content } = await request.json()

    if (!content || content.length > 280) {
      return NextResponse.json({ error: "Invalid tweet content" }, { status: 400 })
    }

    const client = new TwitterApi(session.accessToken as string)
    const tweet = await client.v2.tweet(content)

    return NextResponse.json({ success: true, tweetId: tweet.data.id })
  } catch (error) {
    console.error("Error posting tweet:", error)
    return NextResponse.json({ error: "Failed to post tweet" }, { status: 500 })
  }
}

