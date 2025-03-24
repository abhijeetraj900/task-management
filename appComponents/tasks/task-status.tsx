"use client"

import { useState, useContext, useRef, useEffect } from "react"
import { TaskContext } from "@/context/task-context"

interface TaskStatusProps {
  status: string
  taskId: string
}

export function TaskStatus({ status, taskId }: TaskStatusProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { updateTaskStatus } = useContext(TaskContext)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const statusOptions: ("TO-DO" | "IN-PROGRESS" | "COMPLETED")[] = ["TO-DO", "IN-PROGRESS", "COMPLETED"];


  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="bg-[#f1f1f1] text-[#2f2f2f] px-3 py-1 rounded-full text-xs cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {status}
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white shadow-lg rounded-md border border-[#eaecf0] w-[140px] mt-1">
          {statusOptions.map((option) => (
            <div
              key={option}
              className={`p-2 hover:bg-[#f9f9f9] text-xs cursor-pointer ${status === option ? "bg-[#f1f1f1]" : ""}`}
              onClick={() => {
                updateTaskStatus(taskId, option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

