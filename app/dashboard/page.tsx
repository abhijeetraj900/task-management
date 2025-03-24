"use client";

import { useState, useContext } from "react";
import Header from "@/appComponents/layout/header"
import ViewTabs from "@/appComponents/navigation/view-tabs";
import FilterBar from "@/appComponents/filters/filter-bar";
import TaskListView from "@/appComponents/tasks/task-list-view";
import TaskBoardView from "@/appComponents/tasks/task-board-view";
import CreateTaskModal from "@/appComponents/modals/create-task-modal";
import { TaskProvider, TaskContext } from "@/context/task-context";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";

export default function Dashboard() {
  const [activeView, setActiveView] = useState<"list" | "board">("list");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { reorderTasks } = useContext(TaskContext);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      console.log(`Moving task ${active.id} to ${over.id}`);
      
      const taskId = active.id as string;
      const destinationId = over.id as string;
      const sourceId = active.data.current?.task.status;

      if (sourceId && destinationId) {
        reorderTasks(sourceId, destinationId, taskId);
      }
    }
  };

  return (
    <TaskProvider>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="min-h-screen bg-[#f9f9f9] text-[#231f20] flex flex-col">
          <Header />
          <main className="flex-1 px-6 py-4">
            <ViewTabs activeView={activeView} setActiveView={setActiveView} />
            <FilterBar onAddTask={() => setIsCreateModalOpen(true)} />
            {activeView === "list" ? <TaskListView /> : <TaskBoardView />}
          </main>
          <CreateTaskModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
      </DndContext>
    </TaskProvider>
  );
}
