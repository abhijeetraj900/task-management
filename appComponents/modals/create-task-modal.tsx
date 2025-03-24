"use client"

import type React from "react"

import { useState } from "react"
import { X, Bold, Italic, List, ListOrdered, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useContext } from "react"
import { TaskContext } from "@/context/task-context"

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  const { createTask } = useContext(TaskContext)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<"Work" | "Personal">("Work")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState<"TO-DO" | "IN-PROGRESS" | "COMPLETED">("TO-DO")
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setDescription(text)
    setCharCount(text.length)
  }

  const handleSubmit = () => {
    if (!title.trim()) return

    createTask({
      name: title,
      description,
      category,
      dueDate: dueDate || "Today",
      status,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setCategory("Work")
    setDueDate("")
    setStatus("TO-DO")
    setCharCount(0)

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-medium">Create Task</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Task Title */}
          <div>
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-400">{charCount}/300 characters</div>
            </div>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              className="min-h-[120px] resize-none"
              maxLength={300}
            />
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Category*</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={category === "Work" ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${category === "Work" ? "bg-[#7b1984] text-white" : ""}`}
                  onClick={() => setCategory("Work")}
                >
                  Work
                </Button>
                <Button
                  type="button"
                  variant={category === "Personal" ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${category === "Personal" ? "bg-[#7b1984] text-white" : ""}`}
                  onClick={() => setCategory("Personal")}
                >
                  Personal
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due on*</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "date"
                    input.onchange = (e) => {
                      const target = e.target as HTMLInputElement
                      setDueDate(target.value)
                    }
                    input.click()
                  }}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Task Status*</label>
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                >
                  {status === "TO-DO" ? "Choose" : status}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>

                {isStatusOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setStatus("TO-DO")
                        setIsStatusOpen(false)
                      }}
                    >
                      TO-DO
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setStatus("IN-PROGRESS")
                        setIsStatusOpen(false)
                      }}
                    >
                      IN-PROGRESS
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setStatus("COMPLETED")
                        setIsStatusOpen(false)
                      }}
                    >
                      COMPLETED
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Attachment */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Attachment</label>
            <div className="border border-dashed rounded-md p-4 text-center">
              <p className="text-sm text-gray-500">
                Drop your files here or <span className="text-blue-500 cursor-pointer">Update</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t">
          <Button variant="outline" onClick={onClose}>
            CANCEL
          </Button>
          <Button className="bg-[#7b1984] hover:bg-[#3e0344] text-white" onClick={handleSubmit}>
            CREATE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

