import React from "react";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/utils/utils";

/**
 * A generic error page component to display
 * error messages and provide a reset action.
 */
export interface ErrorPageProps {
  error: {
    /**
     * The HTTP status code
     */
    code?: number;
    /**
     * An automatically generated hash to identify the error server side.
     */
    digest?: string;
    /**
     * The error message to display
     */
    message: string;
  };
  /**
   * Optional child components to render
   * below the error message
   * @default null
   * @example
   * ```tsx
   * <ErrorPage>
   *  <p>Custom child content here</p>
   * </ErrorPage>
   * ```
   */
  children?: React.ReactNode;
  /**
   * Optional reset action to perform when the user
   * clicks the reset button.
   * @default <code>{ action: () => (window.location.href = "/"), message: "Go back to Homepage" }</code>
   */
  reset?: {
    action: () => void;
    message: string;
  };
}

export const ErrorPage: React.FC<ErrorPageProps> = (props: ErrorPageProps) => {
  const returnHome = () => {
    window.location.href = "/";
  };

  const resetMessage = props.reset?.message ?? "Return to homepage";
  const resetAction = props.reset?.action ?? returnHome;

  return (
    <div
      className={cn(
        "flex flex-col grow justify-center items-center text-neutral-800 dark:text-white",
      )}
    >
      {/* Icon */}
      <div className={cn("mb-4")}>
        <AlertTriangleIcon
          size={150}
          className={cn("text-error-600 dark:text-error-800")}
        />
      </div>

      {/* Error Message */}
      {props.error.code && (
        <h1 className={cn("text-4xl font-bold")}>{props.error.code}</h1>
      )}
      {props.error.digest && (
        <p className="text-sm p-2 mb-6">Digest: {props.error.digest}</p>
      )}
      <p className={cn("text-lg mb-6")}>{props.error.message}</p>

      {/* Child Components */}
      {props.children && <div className={cn("mb-6")}>{props.children}</div>}

      {/* Custom Button Component */}
      <Button
        variant="default"
        size="default"
        label={resetMessage}
        onClick={resetAction}
      />
    </div>
  );
};
