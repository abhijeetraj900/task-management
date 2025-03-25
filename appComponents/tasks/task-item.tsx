"use client"

import type React from "react"

import { useContext, useState } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TaskStatus } from "@/appComponents/tasks/task-status"
import { TaskCategory } from "@/appComponents/tasks/task-category"
import { type Task, TaskContext } from "@/context/task-context"

interface TaskItemProps {
  task: Task
  isDragging?: boolean
  onEditTask?: (taskId: string) => void
}

export default function TaskItem({ task, isDragging = false, onEditTask }: TaskItemProps) {
  const { toggleTaskCompletion, deleteTask, toggleTaskSelection, isTaskSelected } = useContext(TaskContext)
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true)

  const isSelected = isTaskSelected(task.id)

  // Set up draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      task,
    },
    disabled: !isDraggingEnabled,
  })

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        zIndex: 10,
      }
    : undefined

  // Handle checkbox click
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingEnabled(false)
    toggleTaskSelection(task.id)

    // Re-enable dragging after a short delay
    setTimeout(() => {
      setIsDraggingEnabled(true)
    }, 100)
  }

  // Handle status indicator click
  const handleStatusClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingEnabled(false)
    toggleTaskCompletion(task.id)

    // Re-enable dragging after a short delay
    setTimeout(() => {
      setIsDraggingEnabled(true)
    }, 100)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDraggingEnabled ? attributes : {})}
      {...(isDraggingEnabled ? listeners : {})}
      className={`grid grid-cols-1 sm:grid-cols-[1fr_120px] md:grid-cols-[1fr_120px_120px_120px] gap-4 px-3 sm:px-6 py-3 border-t border-[#eaecf0] items-center ${isDraggingEnabled ? "cursor-grab active:cursor-grabbing" : "cursor-default"} ${
        isDragging ? "opacity-50" : ""
      } ${isSelected ? "bg-[#f0f0f0]" : ""}`}
    >
      <div className="flex items-center gap-2">
        <div className="mr-1 cursor-pointer" onClick={handleCheckboxClick}>
          <Checkbox id={`task-${task.id}`} checked={isSelected} className="pointer-events-none" />
        </div>
        <div className="flex gap-1">
          <span className="text-[#7b1984] font-bold">:</span>
          <span className="text-[#7b1984] font-bold">:</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`h-4 w-4 rounded-full flex items-center justify-center cursor-pointer
              ${
                task.status === "COMPLETED"
                  ? "border border-[#0d7a0a] bg-[#0d7a0a]"
                  : task.status === "IN-PROGRESS"
                    ? "border border-[#2683b5] bg-[#2683b5]"
                    : "border border-[#979797]"
              }`}
            onClick={handleStatusClick}
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
            ) : task.status === "IN-PROGRESS" ? (
              <div className="h-2 w-2 rounded-full bg-white"></div>
            ) : (
              <div className="h-2 w-2 rounded-full bg-[#979797]"></div>
            )}
          </div>
          <span className={`${task.status === "COMPLETED" ? "line-through" : ""} break-words`}>{task.name}</span>
        </div>
      </div>
      <div className="text-sm">{task.dueDate}</div>
      <TaskStatus status={task.status} taskId={task.id} />
      <div className="flex justify-between items-center">
        <TaskCategory category={task.category} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5 text-[#979797]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEditTask && onEditTask(task.id)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

