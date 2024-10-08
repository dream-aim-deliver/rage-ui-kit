import * as React from "react";

import { cn } from "@/utils/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder = "Type your message", ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-10",
          "w-full",
          "rounded-lg",
          "border border-slate-200",
          "bg-white",
          "px-3 py-2",
          "text-sm",
          "ring-offset-white",
          "placeholder:text-slate-500",
          "focus-visible:outline-none",
          "focus-visible:ring-1",
          "focus-visible:ring-slate-950",
          "focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "dark:border-slate-800",
          "dark:bg-slate-950",
          "dark:ring-offset-slate-800",
          "dark:placeholder:text-slate-400",
          "dark:focus-visible:ring-slate-300",
        )}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
