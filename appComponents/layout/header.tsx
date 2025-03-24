"use client"

import { useContext } from "react"
import { ClipboardList } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TaskContext } from "@/context/task-context"

interface HeaderProps {
  onProfileClick: () => void
}

export default function Header({ onProfileClick }: HeaderProps) {
  const { userProfile } = useContext(TaskContext)

  return (
    <header className="bg-white border-b border-[#eaecf0] px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-5 w-5" />
        <span className="font-semibold text-lg">TaskBuddy</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onProfileClick}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={userProfile.photo} alt={userProfile.name} />
            <AvatarFallback className="bg-[#85d9f1]">{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{userProfile.name}</span>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <span className="mr-1">Logout</span>
        </Button>
      </div>
    </header>
  )
}

