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

  useEffect(scrollToBottom, [messages, prevMessagesLength]);

  return (
    <div
      className={cn(
        "flex flex-col w-full h-screen bg-white dark:bg-neutral-800",
        className,
      )}
    >
      <div className="flex-grow overflow-y-auto px-2 sm:px-6 space-y-4 max-w-full mx-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((message, idx) => {
            return (
              <div key={idx} className="w-full max-w-full overflow-scroll">
                <ConversationMessage key={idx} {...message} />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div
          className={cn(
            "sticky bg-white dark:bg-neutral-800 bottom-0 flex flex-col w-full px-4 sm:px-9 py-3 max-w-full mx-auto",
          )}
        >
          <SendMessageBox onSendMessage={onSendMessage} className="w-full" />
        </div>
      </div>
    </div>
  );
};
