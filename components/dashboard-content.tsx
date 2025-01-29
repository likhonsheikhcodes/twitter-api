"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OverviewTab from "@/components/tabs/overview-tab"
import EngagementTab from "@/components/tabs/engagement-tab"
import FollowersTab from "@/components/tabs/followers-tab"
import TweetsTab from "@/components/tabs/tweets-tab"
import ComposeTweet from "@/components/compose-tweet"
import UserProfile from "@/components/user-profile"
import { fetcher } from "@/lib/utils"

export default function DashboardContent() {
  const { data: session } = useSession()
  const { data: twitterData, error } = useSWR("/api/twitter-data", fetcher)
  const [activeTab, setActiveTab] = useState("overview")

  if (error) return <div>Failed to load dashboard data</div>
  if (!twitterData) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Twitter Dashboard</h1>
        <UserProfile user={twitterData.user} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="tweets">Tweets</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab data={twitterData} />
        </TabsContent>
        <TabsContent value="engagement">
          <EngagementTab data={twitterData} />
        </TabsContent>
        <TabsContent value="followers">
          <FollowersTab data={twitterData} />
        </TabsContent>
        <TabsContent value="tweets">
          <TweetsTab data={twitterData} />
        </TabsContent>
      </Tabs>

      <ComposeTweet />
    </div>
  )
}

