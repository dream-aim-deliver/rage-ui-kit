import React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

export interface SendMessageProps {
    onSend: (content: string) => void
}

export const SendMessage = (props: SendMessageProps) => {
    return (
        <div className="relative flex flex-row items-center justify-between">
            <Textarea className="dark:text-white" />
            <div className="">
                <Send />
            </div>
        </div>
    )
}



