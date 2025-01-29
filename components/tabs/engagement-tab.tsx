import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"

export default function EngagementTab({ data }) {
  const engagementData = {
    labels: ["Likes", "Retweets", "Replies", "Quote Tweets"],
    datasets: [
      {
        label: "Engagement",
        data: [data.engagement.likes, data.engagement.retweets, data.engagement.replies, data.engagement.quoteTweets],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={engagementData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Tweets</CardTitle>
        </CardHeader>
        <CardContent>{/* Add a list or grid of top performing tweets here */}</CardContent>
      </Card>
    </div>
  )
}

