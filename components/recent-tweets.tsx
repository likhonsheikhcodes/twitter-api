import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

interface Tweet {
  id: string
  text: string
  createdAt: string
  likes: number
  retweets: number
}

interface RecentTweetsProps {
  tweets: Tweet[]
}

export default function RecentTweets({ tweets }: RecentTweetsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tweets</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tweets.map((tweet) => (
            <li key={tweet.id} className="border-b pb-4 last:border-b-0">
              <p className="mb-2">{tweet.text}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{format(new Date(tweet.createdAt), "MMM d, yyyy")}</span>
                <div>
                  <span className="mr-4">❤️ {tweet.likes}</span>
                  <span>🔁 {tweet.retweets}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

