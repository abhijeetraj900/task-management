"use client"

import { useContext } from "react"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TaskStatus } from "@/appComponents/tasks/task-status"
import { TaskCategory } from "@/appComponents/tasks/task-category"
import { type Task, TaskContext } from "@/context/task-context"

interface TaskCardProps {
  task: Task
  isDragging?: boolean
  onEditTask?: (taskId: string) => void
}

export default function TaskCard({ task, isDragging = false, onEditTask }: TaskCardProps) {
  const { toggleTaskCompletion, deleteTask, toggleTaskSelection, isTaskSelected } = useContext(TaskContext)

  const isSelected = isTaskSelected(task.id)

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
      className={`bg-white border border-[#eaecf0] rounded-md p-3 shadow-sm cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      } ${isSelected ? "bg-[#f0f0f0]" : ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`card-task-${task.id}`}
            checked={isSelected}
            onCheckedChange={() => toggleTaskSelection(task.id)}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            className={`h-4 w-4 rounded-full flex items-center justify-center cursor-pointer
              ${
                task.status === "COMPLETED"
                  ? "border border-[#0d7a0a] bg-[#0d7a0a]"
                  : task.status === "IN-PROGRESS"
                    ? "border border-[#2683b5] bg-[#2683b5]"
                    : "border border-[#979797]"
              }`}
            onClick={(e) => {
              e.stopPropagation()
              toggleTaskCompletion(task.id)
            }}
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
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4 text-[#979797]" />
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

