"use client";

import { useContext } from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskSection from "@/appComponents/tasks/task-section";
import { TaskContext } from "@/context/task-context";

interface TaskListViewProps {
  onEditTask?: (taskId: string) => void;
  onAddTask?: () => void;
}

export default function TaskListView({
  onEditTask,
  onAddTask,
}: TaskListViewProps) {
  const { filteredTasks } = useContext(TaskContext);

  const todoTasks = filteredTasks.filter((task) => task.status === "TO-DO");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "IN-PROGRESS"
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "COMPLETED"
  );

  // Set up droppable areas
  const { setNodeRef: setTodoRef } = useDroppable({ id: "TO-DO" });
  const { setNodeRef: setInProgressRef } = useDroppable({ id: "IN-PROGRESS" });
  const { setNodeRef: setCompletedRef } = useDroppable({ id: "COMPLETED" });

  return (
    <div className="bg-white rounded-md shadow-sm overflow-x-auto">
      <div className="grid grid-cols-[1fr_120px_120px_120px] gap-4 px-6 py-3 border-b border-[#eaecf0] text-sm font-medium min-w-[800px]">
        <div>Task name</div>
        <div>Due on</div>
        <div>Task Status</div>
        <div>Task Category</div>
      </div>

      <div className="min-w-[800px] md:min-w-full">
        <div
          ref={setTodoRef}
          className="border-b-2  border-transparent hover:border-[#ffe8e4]"
        >
          <TaskSection
            title="Todo"
            count={todoTasks.length}
            tasks={todoTasks}
            bgColor="bg-[#ffe8e4]"
            showAddTask
            onEditTask={onEditTask}
            onAddTask={onAddTask}
          />
        </div>

        <div
          ref={setInProgressRef}
          className="border-b-2 border-transparent hover:border-[#85d9f1]"
        >
          <TaskSection
            title="In-Progress"
            count={inProgressTasks.length}
            tasks={inProgressTasks}
            bgColor="bg-[#85d9f1]"
            showLoadMore={inProgressTasks.length > 5}
            onEditTask={onEditTask}
          />
        </div>

        <div
          ref={setCompletedRef}
          className="border-b-2 border-transparent hover:border-[#ceffcc]"
        >
          <TaskSection
            title="Completed"
            count={completedTasks.length}
            tasks={completedTasks}
            bgColor="bg-[#ceffcc]"
            onEditTask={onEditTask}
          />
        </div>
      </div>
    </div>
  );
}
