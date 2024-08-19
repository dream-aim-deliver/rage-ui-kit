import { useState, FormEvent, KeyboardEvent } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/utils/utils";

export const SendMessageBox = ({
  className = "",
  onSendMessage = (message: string): void => {
    console.log(
      `GENERAL:: ERROR "Message won't be sent!! Override in parent component"  : ${message}`,
    );
  },
}) => {
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  const buttonSubmit = () => {
    onSendMessage(message);
    setMessage("");
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
      buttonSubmit();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "shadow-lg",
        "bg-neutral-100 dark:bg-neutral-800",
        "flex items-center",
        "justify-center",
        "space-x-4",
        className,
      )}
    >
      <textarea
        className={cn(
          "text-gray-900 dark:text-white",
          "dark:bg-neutral-900",
          "rounded-xl",
          "order-none",
          "focus:outline-none",
          "m-2",
          "p-2",
          "flex-grow",
        )}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <PrimaryButton text="" action="send" onClick={buttonSubmit} />
      <div className="w-1"></div>
    </form>
  );
};
