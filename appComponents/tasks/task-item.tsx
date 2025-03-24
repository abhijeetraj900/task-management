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

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
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
      className="grid grid-cols-[1fr_120px_120px_120px] gap-4 px-6 py-3 border-t border-[#eaecf0] items-center cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.status === "COMPLETED"}
          onCheckedChange={() => toggleTaskCompletion(task.id)}
        />
        <div className="flex gap-1">
          <span className="text-[#7b1984] font-bold">:</span>
          <span className="text-[#7b1984] font-bold">:</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`h-4 w-4 rounded-full flex items-center justify-center
            ${task.status === "COMPLETED" ? "border border-[#0d7a0a] bg-[#0d7a0a]" : "border border-[#979797]"}`}
          >
            {task.status === "COMPLETED" ? (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <div className="h-2 w-2 rounded-full bg-[#979797]"></div>
            )}
          </div>
          <span className={task.status === "COMPLETED" ? "line-through" : ""}>{task.name}</span>
        </div>
      </div>
      <div className="text-sm">{task.dueDate}</div>
      <TaskStatus status={task.status} taskId={task.id} />
      <div className="flex justify-between items-center">
        <TaskCategory category={task.category} />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5 text-[#979797]" />
        </Button>
      </div>
    </div>
  )
}