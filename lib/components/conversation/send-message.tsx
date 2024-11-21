"use client";
import { useState, FormEvent, KeyboardEvent } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/utils/utils";

type SendMessageBoxProps = {
  className?: string;
  onSendMessage?: (message: string) => void;
};

export const SendMessageBox = ({
  className = "",
  onSendMessage,
}: SendMessageBoxProps) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!onSendMessage) return;
    onSendMessage(message);
    setMessage("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      setMessage(
        message.slice(0, cursorPosition) + "\n" + message.slice(cursorPosition),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex items-center",
        "justify-center",
        "space-x-4",
        className,
      )}
    >
      <textarea
        className={cn(
          "text-gray-900 dark:text-white",
          "bg-neutral-50 dark:bg-neutral-900",
          "border rounded-md",
          "order-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-neutral-500",
          "m-2",
          "p-2",
          "flex-grow",
        )}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <PrimaryButton
        text=""
        action={"send"}
        onClick={onSendMessage ? sendMessage : undefined}
      />
      <div className="w-1"></div>
    </form>
  );
};
