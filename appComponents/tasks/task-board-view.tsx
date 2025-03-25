"use client"

import { useContext } from "react"
import { Plus } from "lucide-react"
import { useDroppable } from "@dnd-kit/core"
import { Button } from "@/components/ui/button"
import TaskCard from "@/appComponents/tasks/task-card"
import { TaskContext } from "@/context/task-context"

interface TaskBoardViewProps {
  onEditTask?: (taskId: string) => void
  onAddTask?: () => void
}

export default function TaskBoardView({ onEditTask, onAddTask }: TaskBoardViewProps) {
  const { filteredTasks } = useContext(TaskContext)

  const todoTasks = filteredTasks.filter((task) => task.status === "TO-DO")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "IN-PROGRESS")
  const completedTasks = filteredTasks.filter((task) => task.status === "COMPLETED")

  // Set up droppable areas
  const { setNodeRef: setTodoRef } = useDroppable({ id: "TO-DO" })
  const { setNodeRef: setInProgressRef } = useDroppable({ id: "IN-PROGRESS" })
  const { setNodeRef: setCompletedRef } = useDroppable({ id: "COMPLETED" })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#ffe8e4] px-4 py-3 font-medium flex justify-between items-center">
          <div>Todo ({todoTasks.length})</div>
          <Button variant="ghost" size="sm" className="h-7 px-2" onClick={onAddTask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div
          ref={setTodoRef}
          className="p-3 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto min-h-[200px] border-2 border-transparent hover:border-[#ffe8e4]"
        >
          {todoTasks.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No tasks</div>
          ) : (
            todoTasks.map((task) => <TaskCard key={task.id} task={task} onEditTask={onEditTask} />)
          )}
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#85d9f1] px-4 py-3 font-medium">In-Progress ({inProgressTasks.length})</div>
        <div
          ref={setInProgressRef}
          className="p-3 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto min-h-[200px] border-2 border-transparent hover:border-[#85d9f1]"
        >
          {inProgressTasks.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No tasks</div>
          ) : (
            inProgressTasks.map((task) => <TaskCard key={task.id} task={task} onEditTask={onEditTask} />)
          )}
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#ceffcc] px-4 py-3 font-medium">Completed ({completedTasks.length})</div>
        <div
          ref={setCompletedRef}
          className="p-3 space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto min-h-[200px] border-2 border-transparent hover:border-[#ceffcc]"
        >
          {completedTasks.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No tasks</div>
          ) : (
            completedTasks.map((task) => <TaskCard key={task.id} task={task} onEditTask={onEditTask} />)
          )}
        </div>
      </div>
    </div>
  )
}

