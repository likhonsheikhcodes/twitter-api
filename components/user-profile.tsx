import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserProfile({ user }) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user.profileImageUrl} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>
    </div>
  )
}

