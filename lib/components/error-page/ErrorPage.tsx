import React from "react";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/utils/utils";

interface ErrorPageProps {
  errorCode?: number;
  errorMessage?: string;
  children?: React.ReactNode;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode = 404,
  errorMessage = "Page not found",
  children,
}) => {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col justify-center items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white",
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
      <h1 className={cn("text-4xl font-bold")}>{errorCode}</h1>
      <p className={cn("text-lg mb-6")}>{errorMessage}</p>

      {/* Child Components */}
      {children && <div className={cn("mb-6")}>{children}</div>}

      {/* Custom Button Component */}
      <Button
        variant="default"
        size="default"
        label="Go back to Homepage"
        onClick={() => (window.location.href = "/")} // Redirect to the homepage
      />
    </div>
  );
};
