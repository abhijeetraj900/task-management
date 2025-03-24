"use client"

import { Button } from "@/components/ui/button"

interface ViewTabsProps {
  activeView: "list" | "board"
  setActiveView: (view: "list" | "board") => void
}

export default function ViewTabs({ activeView, setActiveView }: ViewTabsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className={`flex pb-1 ${activeView === "list" ? "border-b border-[#7b1984]" : ""}`}>
        <Button
          variant="ghost"
          className={`px-2 font-medium ${activeView === "list" ? "text-[#7b1984]" : "text-[#979797]"}`}
          onClick={() => setActiveView("list")}
        >
          <span className="mr-2">📋</span>
          List
        </Button>
      </div>
      <div className={`flex pb-1 ${activeView === "board" ? "border-b border-[#7b1984]" : ""}`}>
        <Button
          variant="ghost"
          className={`px-2 font-medium ${activeView === "board" ? "text-[#7b1984]" : "text-[#979797]"}`}
          onClick={() => setActiveView("board")}
        >
          <span className="mr-2">📊</span>
          Board
        </Button>
      </div>
    </div>
  )
}

