"use client"

import { useContext } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TaskContext } from "@/context/task-context"

export default function DateFilter() {
  const { filters, setFilters } = useContext(TaskContext)

  const dateOptions = [
    { label: "All", value: null },
    { label: "Today", value: "today" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
          {filters.dueDate ? dateOptions.find((opt) => opt.value === filters.dueDate)?.label : "Due Date"}{" "}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dateOptions.map((option) => (
          <DropdownMenuItem key={option.label} onClick={() => setFilters({ ...filters, dueDate: option.value })}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

