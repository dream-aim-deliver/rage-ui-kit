"use client";
import { ConversationMessage } from "../conversation/message";
import { SendMessageBox } from "../conversation/send-message";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/utils/utils";

export type ChatPageViewModel = {
  messages: MessageViewModel[];
  onSendMessage: (message: string) => void;
};

enum ROLEViewModel {
  USER = "user",
  AGENT = "agent",
}

export type MessageViewModel = {
  role: ROLEViewModel;
  content: string;
  type: "text" | "image";
  timestamp: number;
  isLoading?: boolean;
};

export const ChatPage = ({ messages, onSendMessage }: ChatPageViewModel) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [prevMessagesLength, setPrevMessagesLength] = useState(0);

  const scrollToBottom = () => {
    if (messages.length > prevMessagesLength) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setPrevMessagesLength(messages.length);
  };

  useEffect(scrollToBottom, [messages, prevMessagesLength]);
  return (
    <div className={cn("h-screen bg-gradient-to-r from-blue-500 to-green-500")}>
      <div className={cn("flex-grow flex flex-col justify-between")}>
        <div
          className={cn(
            "h-screen",
            "bg-neutral-100 dark:bg-neutral-800",
            "overflow-y-auto",
            "flex flex-col",
            "space-y-4",
          )}
        >
          {messages.map((message, idx) => {
            return (
              <div key={idx} className={cn("max-width-screen ")}>
                <ConversationMessage key={idx} {...message} />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div
          className={cn(
            "sticky",
            "bg-neutral-100 dark:bg-neutral-800",
            "bottom-0",
            "flex flex-col",
            "w-full space-y-4",
          )}
        >
          <SendMessageBox onSendMessage={onSendMessage} className="w-full" />
        </div>
      </div>
    </div>
  );
};
