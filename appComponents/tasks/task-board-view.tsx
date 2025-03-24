"use client"

import { useContext } from "react"
import { Plus } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import TaskCard from "@/appComponents/tasks/task-card"
import { TaskContext } from "@/context/task-context"

export default function TaskBoardView() {
  const { filteredTasks, reorderTasks } = useContext(TaskContext)

  const todoTasks = filteredTasks.filter((task) => task.status === "TO-DO")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "IN-PROGRESS")
  const completedTasks = filteredTasks.filter((task) => task.status === "COMPLETED")

  // Set up droppable areas
  const { setNodeRef: setTodoRef } = useDroppable({ id: "TO-DO" })
  const { setNodeRef: setInProgressRef } = useDroppable({ id: "IN-PROGRESS" })
  const { setNodeRef: setCompletedRef } = useDroppable({ id: "COMPLETED" })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#ffe8e4] px-4 py-3 font-medium flex justify-between items-center">
          <div>Todo ({todoTasks.length})</div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div ref={setTodoRef} className="p-3 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto">
          {todoTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#85d9f1] px-4 py-3 font-medium">In-Progress ({inProgressTasks.length})</div>
        <div ref={setInProgressRef} className="p-3 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto">
          {inProgressTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#ceffcc] px-4 py-3 font-medium">Completed ({completedTasks.length})</div>
        <div ref={setCompletedRef} className="p-3 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto">
          {completedTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

