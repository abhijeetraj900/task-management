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

export interface UserProfile {
  name: string
  email: string
  phone: string
  photo: string
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
  selectedTasks: string[]
  userProfile: UserProfile
  setFilters: (filters: Filters) => void
  addTask: () => void
  createTask: (data: CreateTaskData) => void
  updateTaskStatus: (id: string, status: "TO-DO" | "IN-PROGRESS" | "COMPLETED") => void
  toggleTaskCompletion: (id: string) => void
  reorderTasks: (sourceId: string, destinationId: string, taskId: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string, data: Partial<Task>) => void
  toggleTaskSelection: (id: string) => void
  deleteSelectedTasks: () => void
  clearSelectedTasks: () => void
  isTaskSelected: (id: string) => boolean
  updateUserProfile: (data: Partial<UserProfile>) => void
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  filteredTasks: [],
  filters: { search: null, category: null, dueDate: null },
  selectedTasks: [],
  userProfile: {
    name: "Aravind",
    email: "aravind@example.com",
    phone: "+1 (555) 123-4567",
    photo: "/placeholder.svg?height=32&width=32",
  },
  setFilters: () => {},
  addTask: () => {},
  createTask: () => {},
  updateTaskStatus: () => {},
  toggleTaskCompletion: () => {},
  reorderTasks: () => {},
  deleteTask: () => {},
  editTask: () => {},
  toggleTaskSelection: () => {},
  deleteSelectedTasks: () => {},
  clearSelectedTasks: () => {},
  isTaskSelected: () => false,
  updateUserProfile: () => {},
})

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [filters, setFilters] = useState<Filters>({
    search: null,
    category: null,
    dueDate: null,
  })
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Aravind",
    email: "aravind@example.com",
    phone: "+1 (555) 123-4567",
    photo: "/placeholder.svg?height=32&width=32",
  })

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

  // Toggle task completion - now moves to next phase
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          // Move to next phase based on current status
          let newStatus: "TO-DO" | "IN-PROGRESS" | "COMPLETED"

          if (task.status === "TO-DO") {
            newStatus = "IN-PROGRESS"
          } else if (task.status === "IN-PROGRESS") {
            newStatus = "COMPLETED"
          } else {
            // If already completed, go back to TO-DO
            newStatus = "TO-DO"
          }

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

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
    // Also remove from selected tasks if it was selected
    setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id))
  }

  // Edit a task
  const editTask = (id: string, data: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...data } : task)))
  }

  // Toggle task selection for batch operations
  const toggleTaskSelection = (id: string) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id))
    } else {
      setSelectedTasks([...selectedTasks, id])
    }
  }

  // Delete all selected tasks
  const deleteSelectedTasks = () => {
    setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)))
    setSelectedTasks([])
  }

  // Clear all selected tasks
  const clearSelectedTasks = () => {
    setSelectedTasks([])
  }

  // Check if a task is selected
  const isTaskSelected = (id: string) => {
    return selectedTasks.includes(id)
  }

  // Update user profile
  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfile({ ...userProfile, ...data })
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filters,
        selectedTasks,
        userProfile,
        setFilters,
        addTask,
        createTask,
        updateTaskStatus,
        toggleTaskCompletion,
        reorderTasks,
        deleteTask,
        editTask,
        toggleTaskSelection,
        deleteSelectedTasks,
        clearSelectedTasks,
        isTaskSelected,
        updateUserProfile,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

