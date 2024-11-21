import { Avatar } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { MermaidMessageContent } from "./mermaid-message-content";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cn } from "@/utils/utils";
import ImageComponent from "@/components/conversation/image-component";
import { z } from "zod";
import { CheckIcon, ClockIcon, LucideIcon, XCircleIcon } from "lucide-react";

export const MessageContentSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
  content_type: z.union([
    z.literal("image"),
    z.literal("text"),
    z.literal("citation"),
  ]),
});
export type TMessageContent = z.infer<typeof MessageContentSchema>;

export const MessageSchema = z.object({
  id: z.number().optional(),
  status: z.union([
    z.literal("request"),
    z.literal("error"),
    z.literal("success"),
  ]),
  message_contents: z.array(MessageContentSchema).optional(),
  sender: z.string(),
  sender_type: z.union([z.literal("user"), z.literal("agent")]),
  created_at: z.string().optional(),
  thread_id: z.number().optional(), // TODO: threads (for replies) to be implemented
});

export type TMessage = z.infer<typeof MessageSchema>;

export const ConversationMessage = ({
  sender_type,
  created_at,
  message_contents,
  status,
}: TMessage) => {
  const createdAtInt = created_at ? parseInt(created_at) : NaN;

  // TODO: handle locale
  const formattedDate = isNaN(createdAtInt)
    ? ""
    : new Date(createdAtInt).toLocaleString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
      });

  const avatarLetter = sender_type === "user" ? "U" : "A";
  const avatarColor =
    sender_type === "user"
      ? "bg-blue-400"
      : "bg-neutral-800 dark:bg-neutral-950";

  const isLoading = message_contents === undefined || message_contents === null;

  const statusIcons: Record<TMessage["status"], LucideIcon> = {
    error: XCircleIcon,
    request: ClockIcon,
    success: CheckIcon,
  };

  const getStatusIcon = () => {
    const IconComponent = statusIcons[status];
    return <IconComponent className="w-3 h-3 mr-1" />;
  };

  const statusMessageColors: Record<TMessage["status"], string> = {
    error: "bg-red-300",
    request: "bg-blue-100",
    success: "bg-blue-300",
  };

  const statusTailBorders: Record<TMessage["status"], string> = {
    error: "border-l-red-300",
    request: "border-l-blue-100",
    success: "border-l-blue-300",
  };

  const CachedContentBlock = useMemo(() => {
    if (message_contents) {
      const messageContentsRendered = message_contents.map((messageContent) => {
        if (messageContent.content_type === "image") {
          return <ImageComponent base64String={messageContent.content} />;
        }
        // TODO: Implement "citation" case
        return (
          <ReactMarkdown
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            rehypePlugins={[rehypeRaw]}
            className="prose text-wrap text-gray-900 mt-2 mb-2"
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
            {messageContent.content}
          </ReactMarkdown>
        );
      });
      return messageContentsRendered;
    }
  }, [message_contents]);

  return (
    <div
      className={cn(
        `flex space-x-4 p-4 bg-transparent rounded-xl ${sender_type === "user" ? "justify-end" : ""}`,
      )}
    >
      {sender_type !== "user" && (
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
          "rounded-xl border p-4",
          "transition-colors",
          sender_type === "user"
            ? statusMessageColors[status]
            : "bg-neutral-200 text-black",
        )}
      >
        <div className={cn("flex space-x-4 align-text-center")}></div>

        {/* Message Content */}
        <div className={cn(`object-center rounded-xl p-1 overflow-hidden`)}>
          {isLoading ? (
            <div className={cn("animate-pulse flex space-x-4")}>
              <div className={cn("h-4 bg-gray-400 rounded w-4")}></div>
            </div>
          ) : (
            <>
              {CachedContentBlock}
              <div
                className={cn(
                  "flex items-center text-xs text-gray-700 mt-2 text-right",
                )}
              >
                {getStatusIcon()}
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
            sender_type === "user"
              ? `${statusTailBorders[status]} right-[-10px]`
              : "border-l-gray-200 left-[-10px] transform scale-x-[-1]",
          )}
        ></div>
      </div>
      {sender_type === "user" && (
        <div className={cn("self-end text-black")}>
          <Avatar
            className={cn(
              `${avatarColor} text-white dark:bg-blue-500 flex items-center justify-center border`,
            )}
          >
            {avatarLetter}
          </Avatar>
        </div>
      )}
    </div>
  );
};
