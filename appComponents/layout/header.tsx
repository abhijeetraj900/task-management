import { ClipboardList } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-[#eaecf0] px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-5 w-5" />
        <span className="font-semibold text-lg">TaskBuddy</span>
      </div>
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Aravind" />
          <AvatarFallback className="bg-[#85d9f1]">A</AvatarFallback>
        </Avatar>
        <span className="text-sm">Aravind</span>
        <Button variant="outline" size="sm" className="text-xs">
          <span className="mr-1">Logout</span>
        </Button>
      </div>
    </header>
  )
}

