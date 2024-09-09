"use client"

import { Toast, ToastDescription, ToastTitle, ToastClose } from "@/components/ui/toast"
import { cn } from "@/utils/utils"
import { CheckCircle, AlertCircle, Info, XCircle } from "lucide-react" 

// Define Success, Warning, Error, Info
const toastTypeStyles = {
  success: "border-green-600 bg-green-50 text-green-800",
  warning: "border-yellow-600 bg-yellow-50 text-yellow-800",
  error: "border-red-600 bg-red-50 text-red-800",
  info: "border-blue-600 bg-blue-50 text-blue-800",
}

const toastIcons = {
  success: <CheckCircle className="text-green-600 h-5 w-5" />,
  warning: <AlertCircle className="text-yellow-600 h-5 w-5" />,
  error: <XCircle className="text-red-600 h-5 w-5" />,
  info: <Info className="text-blue-600 h-5 w-5" />,
}

// Define types
type ToastComponentProps = {
  id: string
  title: string
  description: string
  type: "success" | "warning" | "error" | "info"
  onClose?: () => void
}

export function ToastComponent({
  id,
  title,
  description,
  type,
  onClose,
}: ToastComponentProps) {
  return (
    <Toast key={id} className={cn("flex items-center space-x-3 p-4", toastTypeStyles[type])}>
      {/* Icon depending on the type */}
      {toastIcons[type]}
      <div className="flex flex-col">
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>
      </div>
      <ToastClose onClick={onClose} />
    </Toast>
  )
}
