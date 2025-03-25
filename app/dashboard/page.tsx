"use client"

import { useState, useContext } from "react"
import Header from "@/appComponents/layout/header"
import ViewTabs from "@/appComponents/navigation/view-tabs"
import FilterBar from "@/appComponents/filters/filter-bar"
import TaskListView from "@/appComponents/tasks/task-list-view"
import TaskBoardView from "@/appComponents/tasks/task-board-view"
import CreateTaskModal from "@/appComponents/modals/create-task-modal"
import EditTaskModal from "@/appComponents/modals/edit-task-modal"
import UserProfileModal from "@/appComponents/modals/user-profile-modal"
import BatchActionsBar from "@/appComponents/tasks/batch-actions-bar"
import { TaskProvider, TaskContext } from "@/context/task-context"
import { DndContext, type DragEndEvent, closestCenter, type DragStartEvent, DragOverlay, pointerWithin } from "@dnd-kit/core"
import TaskItem from "@/appComponents/tasks/task-item"
import TaskCard from "@/appComponents/tasks/task-card"

function TaskBuddyContent() {
  const [activeView, setActiveView] = useState<"list" | "board">("list")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null)

  const { reorderTasks, tasks, selectedTasks, deleteSelectedTasks, clearSelectedTasks } = useContext(TaskContext)

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTaskId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTaskId(null)
    const { active, over } = event

    if (over && active.id !== over.id) {
      // The task ID is the active.id
      // The destination container ID is the over.id
      const taskId = active.id as string
      const destinationId = over.id as string

      // Only process if the over.id is one of our status containers
      if (["TO-DO", "IN-PROGRESS", "COMPLETED"].includes(destinationId)) {
        const sourceId = tasks.find((task) => task.id === taskId)?.status || "TO-DO"
        reorderTasks(sourceId, destinationId, taskId)
      }
    }
  }

  const activeTask = activeTaskId ? tasks.find((task) => task.id === activeTaskId) : null

  const openEditModal = (taskId: string) => {
    setEditingTaskId(taskId)
    setIsEditModalOpen(true)
  }

  const openCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[]}
    >
      <div className="min-h-screen bg-[#f9f9f9] text-[#231f20] flex flex-col">
        <Header onProfileClick={() => setIsProfileModalOpen(true)} />
        <main className="flex-1 px-3 sm:px-6 py-4 overflow-x-hidden">
          <ViewTabs activeView={activeView} setActiveView={setActiveView} />
          <FilterBar onAddTask={openCreateModal} />

          {selectedTasks.length > 0 && (
            <BatchActionsBar
              selectedCount={selectedTasks.length}
              onDelete={deleteSelectedTasks}
              onCancel={clearSelectedTasks}
            />
          )}

          {activeView === "list" ? (
            <TaskListView onEditTask={openEditModal} onAddTask={openCreateModal} />
          ) : (
            <TaskBoardView onEditTask={openEditModal} onAddTask={openCreateModal} />
          )}
        </main>

        <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

        {editingTaskId && (
          <EditTaskModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} taskId={editingTaskId} />
        )}

        <UserProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />

        <DragOverlay>
          {activeTaskId &&
            activeTask &&
            (activeView === "list" ? (
              <TaskItem task={activeTask} isDragging />
            ) : (
              <TaskCard task={activeTask} isDragging />
            ))}
        </DragOverlay>
      </div>
    </DndContext>
  )
}

export default function TaskBuddyApp() {
  return (
    <TaskProvider>
      <TaskBuddyContent />
    </TaskProvider>
  )
}

