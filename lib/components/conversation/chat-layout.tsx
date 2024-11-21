"use client";

import { ConversationMessage, TMessage } from "../conversation/message";
import { SendMessageBox } from "../conversation/send-message";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/utils/utils";

export type ChatPageViewModel = {
  messages: TMessage[];
  onSendMessage?: (message: string) => void;
  className?: string;
};

export const ChatPage = ({
  messages,
  onSendMessage,
  className,
}: ChatPageViewModel) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [prevMessagesLength, setPrevMessagesLength] = useState(0);

  const scrollToBottom = () => {
    if (messages.length > prevMessagesLength) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    setPrevMessagesLength(messages.length);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(scrollToBottom, [messages]);
  return (
    <div className={cn("flex w-full bg-white dark:bg-neutral-800", className)}>
      <div className="flex-grow flex flex-col justify-between">
        <div className="overflow-y-auto flex flex-col space-y-4">
          {messages.map((message, idx) => {
            return (
              <div key={idx} className="max-width-screen">
                <ConversationMessage key={idx} {...message} />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div
          className={cn(
            "sticky",
            "bg-white dark:bg-neutral-800",
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
