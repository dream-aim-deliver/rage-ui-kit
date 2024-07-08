import React from "react"

export interface MessageProps {
    content: string
    isLoading?: boolean
}

export const Message = (props: MessageProps) => {
    return (
        <div>Hello World</div>
    )
}

