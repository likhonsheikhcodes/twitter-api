"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function ComposeTweet() {
  const [tweetContent, setTweetContent] = useState("")
  const { toast } = useToast()

  const handleTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/post-tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: tweetContent }),
      })
      if (response.ok) {
        setTweetContent("")
        toast({
          title: "Tweet posted successfully!",
          description: "Your tweet has been sent.",
        })
      } else {
        throw new Error("Failed to post tweet")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post tweet. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 rounded-full shadow-lg">Compose Tweet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compose a new tweet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleTweetSubmit} className="space-y-4">
          <Textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="What's happening?"
            maxLength={280}
          />
          <Button type="submit" className="w-full">
            Tweet
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

