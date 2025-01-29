import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"

export default function FollowersTab({ data }) {
  const followerGrowthData = {
    labels: data.followerGrowth.labels,
    datasets: [
      {
        label: "Follower Count",
        data: data.followerGrowth.data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Follower Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={followerGrowthData}
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
          <CardTitle>Top Followers</CardTitle>
        </CardHeader>
        <CardContent>{/* Add a list or grid of top followers here */}</CardContent>
      </Card>
    </div>
  )
}

