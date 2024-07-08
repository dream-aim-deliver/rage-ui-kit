import React from "react"

export interface SendMessageProps {
    onSend: (content: string) => void
}

export const SendMessage = (props: SendMessageProps) => {
    return (
        <div>Send Message</div>
    )
}

