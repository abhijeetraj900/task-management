"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import TaskItem from "@/appComponents/tasks/task-item"
import type { Task } from "@/context/task-context"

interface TaskSectionProps {
  title: string
  count: number
  tasks: Task[]
  bgColor: string
  showAddTask?: boolean
  showLoadMore?: boolean
  onEditTask?: (taskId: string) => void
  onAddTask?: () => void
}

export default function TaskSection({
  title,
  count,
  tasks,
  bgColor,
  showAddTask = false,
  showLoadMore = false,
  onEditTask,
  onAddTask,
}: TaskSectionProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="border-b border-[#eaecf0]">
      <div
        className={`flex justify-between items-center px-6 py-2 ${bgColor} cursor-pointer`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="font-medium">
          {title} ({count})
        </div>
        {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>

      {expanded && (
        <div>
          {showAddTask && (
            <div className="px-6 py-2 border-t border-[#eaecf0] flex items-center">
              <Button variant="ghost" className="h-8 px-2 text-sm text-[#7b1984]" onClick={onAddTask}>
                <Plus className="h-4 w-4 mr-1" /> ADD TASK
              </Button>
            </div>
          )}

          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onEditTask={onEditTask} />
          ))}

          {showLoadMore && (
            <div className="flex justify-center py-3 border-t border-[#eaecf0]">
              <Button variant="ghost" className="text-[#2683b5] text-sm">
                Load more
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

