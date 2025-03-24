"use client"

import { useContext } from "react"
import { useDroppable } from "@dnd-kit/core"
import TaskSection from "@/appComponents/tasks/task-section"
import { TaskContext } from "@/context/task-context"

export default function TaskListView() {
  const { filteredTasks } = useContext(TaskContext)

  const todoTasks = filteredTasks.filter((task) => task.status === "TO-DO")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "IN-PROGRESS")
  const completedTasks = filteredTasks.filter((task) => task.status === "COMPLETED")

  // Set up droppable areas
  const { setNodeRef: setTodoRef } = useDroppable({ id: "TO-DO" })
  const { setNodeRef: setInProgressRef } = useDroppable({ id: "IN-PROGRESS" })
  const { setNodeRef: setCompletedRef } = useDroppable({ id: "COMPLETED" })

  return (
    <div className="bg-white rounded-md shadow-sm">
      <div className="grid grid-cols-[1fr_120px_120px_120px] gap-4 px-6 py-3 border-b border-[#eaecf0] text-sm font-medium">
        <div>Task name</div>
        <div>Due on</div>
        <div>Task Status</div>
        <div>Task Category</div>
      </div>

      <div ref={setTodoRef}>
        <TaskSection title="Todo" count={todoTasks.length} tasks={todoTasks} bgColor="bg-[#ffe8e4]" showAddTask />
      </div>

      <div ref={setInProgressRef}>
        <TaskSection
          title="In-Progress"
          count={inProgressTasks.length}
          tasks={inProgressTasks}
          bgColor="bg-[#85d9f1]"
          showLoadMore={inProgressTasks.length > 5}
        />
      </div>

      <div ref={setCompletedRef}>
        <TaskSection title="Completed" count={completedTasks.length} tasks={completedTasks} bgColor="bg-[#ceffcc]" />
      </div>
    </div>
  )
}

