import { Avatar } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { MermaidMessageContent } from "./mermaid-message-content";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cn } from "@/utils/utils";
import ImageComponent from "@/components/conversation/image-component";

export enum ROLEViewModel {
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

export interface MessageProps {
  content: string;
  isLoading?: boolean;
  firstName: string;
  lastName: string;
  timestamp: string;
}

export const ConversationMessage = ({
  role = ROLEViewModel.USER,
  timestamp = 1698983503,
  type = "text",
  content,
}: MessageViewModel) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  const avatarLetter = role === ROLEViewModel.USER ? "U" : "A";
  const avatarColor =
    role === ROLEViewModel.USER
      ? "bg-blue-500"
      : "bg-neutral-800 dark:bg-neutral-950";
  const isLoading = content === undefined || content === null || content === "";
  const CachedContentBlock = useMemo(() => {
    if (type === "image") {
      return <ImageComponent base64String={content} />;
    }
    return (
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        rehypePlugins={[rehypeRaw]}
        className="prose text-gray-900 "
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match && match[1] === "mermaid" ? (
              <div>
                <MermaidMessageContent diagram={children} />
                <code>{children}</code>
              </div>
            ) : (
              // @ts-expect-error: SyntaxHighlighter does not fully align with the expected types, but this is safe to ignore.
              <SyntaxHighlighter
                language={match && match[1] ? match[1] : ""}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }, [content, type]);

  return (
    <div
      className={cn(
        `flex space-x-4 p-4 bg-transparent rounded-xl ${role === ROLEViewModel.USER ? "justify-end" : ""}`,
      )}
    >
      {role !== ROLEViewModel.USER && (
        <div className={cn("self-end")}>
          <Avatar
            className={cn(
              `${avatarColor} text-white flex items-center justify-center`,
            )}
          >
            {avatarLetter}
          </Avatar>
        </div>
      )}

      {/* Message Block */}
      <div
        className={cn(
          "relative",
          "max-w-lg",
          "rounded-xl p-4",
          "animate-opacity",
          role === ROLEViewModel.USER
            ? "bg-blue-400 text-white"
            : "bg-neutral-300 text-black",
        )}
      >
        <div className={cn("flex space-x-4 align-text-center")}></div>

        {/* Message Content */}
        <div
          className={cn(
            `object-center rounded-xl p-1 ${isLoading ? "" : "animate-opacity"} overflow-hidden`,
          )}
        >
          {isLoading ? (
            <div className={cn("animate-pulse flex space-x-4")}>
              <div className={cn("h-4 bg-gray-400 rounded w-4")}></div>
            </div>
          ) : (
            <>
              {CachedContentBlock}
              <div className={cn("text-xs text-gray-500 mt-2 text-right")}>
                {formattedDate}
              </div>
            </>
          )}
        </div>

        {/* Tail for the message */}
        <div
          className={cn(
            "absolute",
            "bottom-0 w-0 h-0",
            "border-t-[10px] border-t-transparent",
            "border-r-[10px] border-r-transparent",
            "border-l-[10px]",
            role === ROLEViewModel.USER
              ? "border-l-blue-400 right-[-10px]"
              : "border-l-gray-300 left-[-10px] transform scale-x-[-1]",
          )}
        ></div>
      </div>
      {role === ROLEViewModel.USER && (
        <div className={cn("self-end text-black")}>
          <Avatar
            className={cn(
              `${avatarColor} text-white dark:bg-blue-500 flex items-center justify-center`,
            )}
          >
            {avatarLetter}
          </Avatar>
        </div>
      )}
    </div>
  );
};
