"use client"

import { createContext, useState, type ReactNode, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { mockTasks } from "@/lib/data"

export interface Task {
  id: string
  name: string
  description?: string
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED"
  dueDate: string
  category: string
  priority: number
}

interface Filters {
  search: string | null
  category: string | null
  dueDate: string | null
}

interface CreateTaskData {
  name: string
  description?: string
  category: string
  dueDate: string
  status: "TO-DO" | "IN-PROGRESS" | "COMPLETED"
}

interface TaskContextType {
  tasks: Task[]
  filteredTasks: Task[]
  filters: Filters
  setFilters: (filters: Filters) => void
  addTask: () => void
  createTask: (data: CreateTaskData) => void
  updateTaskStatus: (id: string, status: "TO-DO" | "IN-PROGRESS" | "COMPLETED") => void
  toggleTaskCompletion: (id: string) => void
  reorderTasks: (sourceId: string, destinationId: string, taskId: string) => void
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  filteredTasks: [],
  filters: { search: null, category: null, dueDate: null },
  setFilters: () => {},
  addTask: () => {},
  createTask: () => {},
  updateTaskStatus: () => {},
  toggleTaskCompletion: () => {},
  reorderTasks: () => {},
})

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filters, setFilters] = useState<Filters>({
    search: null,
    category: null,
    dueDate: null,
  })
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)

  // Apply filters whenever tasks or filters change
  useEffect(() => {
    let result = [...tasks]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter((task) => task.name.toLowerCase().includes(searchTerm))
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((task) => task.category === filters.category)
    }

    // Apply due date filter
    if (filters.dueDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (filters.dueDate === "today") {
        result = result.filter((task) => task.dueDate === "Today")
      } else if (filters.dueDate === "week") {
        // This is a simplified version - in a real app, you'd parse actual dates
        result = result.filter((task) => task.dueDate === "Today" || task.dueDate.includes("Dec, 2024"))
      } else if (filters.dueDate === "month") {
        // This is a simplified version - in a real app, you'd parse actual dates
        result = result.filter((task) => task.dueDate === "Today" || task.dueDate.includes("Dec, 2024"))
      }
    }

    setFilteredTasks(result)
  }, [tasks, filters])

  // Add a new task (opens modal)
  const addTask = () => {
    // This function now just triggers the modal in the UI
    // The actual task creation happens in createTask
  }

  // Create a new task with provided data
  const createTask = (data: CreateTaskData) => {
    const newTask: Task = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
      category: data.category,
      priority: 1,
    }

    setTasks([newTask, ...tasks])
  }

  // Update task status
  const updateTaskStatus = (id: string, status: "TO-DO" | "IN-PROGRESS" | "COMPLETED") => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)))
  }

  // Toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const newStatus = task.status === "COMPLETED" ? "TO-DO" : "COMPLETED"
          return { ...task, status: newStatus }
        }
        return task
      }),
    )
  }

  // Reorder tasks (for drag and drop)
  const reorderTasks = (sourceId: string, destinationId: string, taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: destinationId as "TO-DO" | "IN-PROGRESS" | "COMPLETED" }
        }
        return task
      }),
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filters,
        setFilters,
        addTask,
        createTask,
        updateTaskStatus,
        toggleTaskCompletion,
        reorderTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

