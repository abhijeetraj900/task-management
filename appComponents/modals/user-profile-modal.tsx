"use client"

import { useState, useContext } from "react"
import { X, Camera, Mail, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TaskContext } from "@/context/task-context"

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { userProfile, updateUserProfile } = useContext(TaskContext)

  const [name, setName] = useState(userProfile.name)
  const [email, setEmail] = useState(userProfile.email)
  const [phone, setPhone] = useState(userProfile.phone)
  const [photo, setPhoto] = useState(userProfile.photo)

  const handleSubmit = () => {
    updateUserProfile({
      name,
      email,
      phone,
      photo,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-medium">User Profile</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 relative group">
              <AvatarImage src={photo} alt={name} />
              <AvatarFallback className="bg-[#85d9f1] text-2xl">{name.charAt(0)}</AvatarFallback>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" /> Full Name
              </label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone
              </label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t">
          <Button variant="outline" onClick={onClose}>
            CANCEL
          </Button>
          <Button className="bg-[#7b1984] hover:bg-[#3e0344] text-white" onClick={handleSubmit}>
            SAVE CHANGES
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

