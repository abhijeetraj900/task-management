"use client"

import { useContext } from "react"
import { MoreHorizontal } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { TaskStatus } from "@/appComponents/tasks/task-status"
import { TaskCategory } from "@/appComponents/tasks/task-category"
import { type Task, TaskContext } from "@/context/task-context"

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  const { toggleTaskCompletion } = useContext(TaskContext)

  // Set up draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      task,
    },
  })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 10,
      }
    : undefined

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white border border-[#eaecf0] rounded-md p-3 shadow-sm cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`card-task-${task.id}`}
            checked={task.status === "COMPLETED"}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
          />
          <div className="flex gap-1">
            <span className="text-[#7b1984] font-bold">:</span>
            <span className="text-[#7b1984] font-bold">:</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4 text-[#979797]" />
        </Button>
      </div>

      <div className={`ml-8 mb-3 ${task.status === "COMPLETED" ? "line-through" : ""}`}>{task.name}</div>

      <div className="flex justify-between items-center text-xs">
        <div className="text-[#979797]">Due: {task.dueDate}</div>
        <div className="flex gap-2">
          <TaskStatus status={task.status} taskId={task.id} />
          <TaskCategory category={task.category} />
        </div>
      </div>
    </div>
  )
}
