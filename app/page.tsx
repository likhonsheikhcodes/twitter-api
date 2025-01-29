import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Twitter Pilot</span>
        </h1>

        <p className="mt-3 text-2xl">Your all-in-one Twitter management and analytics platform</p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {session ? (
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button size="lg">Sign in with Twitter</Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

