import { TCreateResearchContextViewModel } from "../models";
import { cn } from "@/utils/utils";
import { Loader, CheckCircle, XCircle } from "lucide-react";

export const CreateResearchContextCreating = (
  props: TCreateResearchContextViewModel,
) => {
  const icon = () => {
    if (props.status === "request") {
      return <Loader className="animate-spin text-neutral-800 w-6 h-6" />;
    }
    if (props.status === "progress") {
      return <Loader className="animate-spin text-neutral-500 w-6 h-6" />;
    }
    if (props.status === "error") {
      return <XCircle className="text-accent-error w-6 h-6" />;
    }
    if (props.status === "success") {
      return <CheckCircle className="text-accent-success w-6 h-6" />;
    }
  };
  const title = () => {
    if (props.status === "request") {
      return "Requesting research context creation...";
    }
    if (props.status === "progress") {
      return "Processing research context creation...";
    }
    if (props.status === "error") {
      return "Error";
    }
    if (props.status === "success") {
      return "Success";
    }
  };
  const message = () => {
    if (props.status === "request") {
      return "Creating research context...";
    }
    if (props.status === "progress") {
      return props.message;
    }
    if (props.status === "error") {
      return props.message;
    }
    if (props.status === "success") {
      return `Research context created: ${props.researchContext.title}`;
    }
  };
  return (
    <div className="flex flex-col gap-4 p-6 items-center justify-center bg-white shadow-md rounded-lg">
      <div>{icon()}</div>

      <h1
        className={cn(
          "text-xl font-bold",
          props.status === "error" && "text-accent-error",
          props.status === "success" && "text-accent-success",
          (props.status === "request" || props.status === "progress") &&
            "text-neutral-600",
          props.status !== "error" &&
            props.status !== "success" &&
            "text-neutral-800",
        )}
      >
        {title()}
      </h1>

      <p
        className={cn(
          "text-sm text-center",
          props.status === "error" ? "text-accent-error" : "text-neutral-700",
        )}
      >
        {message()}
      </p>
    </div>
  );
};
