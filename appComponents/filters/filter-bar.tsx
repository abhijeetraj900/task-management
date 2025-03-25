"use client"

import { useContext } from "react"
import { Button } from "@/components/ui/button"
import CategoryFilter from "@/appComponents/filters/category-filter"
import DateFilter from "@/appComponents/filters/date-filter"
import SearchBar from "@/appComponents/filters/search-bar"
import { TaskContext } from "@/context/task-context"

interface FilterBarProps {
  onAddTask: () => void
}

export default function FilterBar({ onAddTask }: FilterBarProps) {
  const { addTask } = useContext(TaskContext)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span>Filter by:</span>
        <CategoryFilter />
        <DateFilter />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <SearchBar />
        <Button className="bg-[#7b1984] hover:bg-[#3e0344] text-white ml-auto sm:ml-0" onClick={onAddTask}>
          ADD TASK
        </Button>
      </div>
    </div>
  )
}