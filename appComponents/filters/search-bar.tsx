"use client"

import { useContext } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TaskContext } from "@/context/task-context"

export default function SearchBar() {
  const { filters, setFilters } = useContext(TaskContext)

  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#979797]" />
      <Input
        placeholder="Search"
        className="pl-8 h-9 w-[240px] text-sm border-[#dddadd] rounded-md"
        value={filters.search || ""}
        onChange={(e) => setFilters({ ...filters, search: e.target.value || null })}
      />
    </div>
  )
}

