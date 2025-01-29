import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import type { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

type Tweet = {
  id: string
  text: string
  createdAt: string
  likes: number
  retweets: number
}

const columns: ColumnDef<Tweet>[] = [
  {
    accessorKey: "text",
    header: "Tweet",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => format(new Date(row.getValue("createdAt")), "MMM d, yyyy"),
  },
  {
    accessorKey: "likes",
    header: "Likes",
  },
  {
    accessorKey: "retweets",
    header: "Retweets",
  },
]

export default function TweetsTab({ data }) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Tweets</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data.tweets} />
        </CardContent>
      </Card>
    </div>
  )
}

