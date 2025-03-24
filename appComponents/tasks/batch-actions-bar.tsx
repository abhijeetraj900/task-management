"use client"

import { Button } from "@/components/ui/button"
import { Trash2, X } from "lucide-react"

interface BatchActionsBarProps {
  selectedCount: number
  onDelete: () => void
  onCancel: () => void
}

export default function BatchActionsBar({ selectedCount, onDelete, onCancel }: BatchActionsBarProps) {
  return (
    <div className="bg-[#f0f0f0] mb-4 p-3 rounded-md flex justify-between items-center">
      <div className="font-medium">
        {selectedCount} {selectedCount === 1 ? "task" : "tasks"} selected
      </div>
      <div className="flex gap-2">
        <Button variant="destructive" size="sm" onClick={onDelete} className="bg-red-600 hover:bg-red-700">
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
        <Button variant="outline" size="sm" onClick={onCancel}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  )
}

