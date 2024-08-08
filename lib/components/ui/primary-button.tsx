import { SendHorizonalIcon } from "lucide-react";
import { cn } from "@/utils/utils";

export enum PrimaryAction {
  SEND = "SEND",
}
export type PrimaryButtonViewModel = {
  text?: string;
  url?: string;
  action: PrimaryAction;
  onClick?: () => void;
};
export const PrimaryButton = ({
  text = "Primary Button",
  action = PrimaryAction.SEND,
  onClick = () => {},
}: PrimaryButtonViewModel) => {
  return (
    <div className={cn("flex bg-transparent justify-center")}>
      <button
        className={cn(
          "bg-blue-600 dark:bg-blue-900",
          "hover:bg-blue-900 dark:hover:bg-blue-600",
          "text-white",
          "font-bold",
          "py-2",
          "px-4",
          "rounded-full",
        )}
        onClick={onClick}
      >
        {action === PrimaryAction.SEND && <SendHorizonalIcon />}
        {text}
      </button>
    </div>
  );
};
