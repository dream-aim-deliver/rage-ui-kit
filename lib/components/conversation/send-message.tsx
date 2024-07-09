import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/utils/utils";

export interface SendMessageProps {
  onSend: (content: string) => void;
}

export const SendMessage = (props: SendMessageProps) => {
  const [content, setContent] = useState<string>("");
  const handleSend = () => {
    props.onSend(content);
    setContent("");
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default action to avoid a line break in the textarea
      handleSend();
      setContent("");
    } else if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
      // Check for Ctrl+A or Cmd+A for selecting all text
      e.preventDefault(); // Prevent the browser's select all action
      e.currentTarget.select(); // Select all text in the textarea
    }
  };
  return (
    <div className="relative flex flex-row items-center justify-between gap-2">
      <Textarea
        className="dark:text-white"
        value={content}
        onChange={handleContentChange}
        onKeyDown={handleKeyPress}
      />
      <div
        className={cn(
          "flex flex-col items-center",
          "rounded-full p-2",
          "self-end",
          "bg-brand-500 hover:bg-brand-800 active:bg-slate-950",
          "hover:text-white"
        )}
        onClick={handleSend}
      >
        <Send size={16} />
      </div>
      <textarea />
    </div>
  );
};
