import { SendHorizonalIcon } from "lucide-react";
import { cn } from "@/utils/utils";

export type PrimaryButtonViewModel = {
  text?: string;
  url?: string;
  action: "send";
  onClick?: () => void;
};
export const PrimaryButton = ({
  text = "Primary Button",
  action = "send",
  onClick,
}: PrimaryButtonViewModel) => {
  const isDisabled = !onClick;
  const colorClasses = isDisabled
    ? "bg-blue-100 cursor-not-allowed"
    : "bg-blue-500 dark:bg-blue-900 hover:bg-blue-600 dark:hover:bg-blue-600";

  return (
    <div className={cn("flex bg-transparent justify-center")}>
      <button
        className={cn(
          colorClasses,
          "text-white",
          "font-bold",
          "py-2",
          "px-4",
          "rounded-full border",
        )}
        onClick={onClick}
      >
        {action === "send" && <SendHorizonalIcon />}
        {text}
      </button>
    </div>
  );
};
