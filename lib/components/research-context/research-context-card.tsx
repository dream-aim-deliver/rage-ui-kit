"use client";
import {
  CardContent,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from "@/ui/card";

import { Button } from "@/components/button/index";
import { cn } from "@/utils/utils";

export interface ResearchContextCardProps {
  title: string;
  description: string;
  id: number;
  callbacks: {
    onNavigateToSourcesPage: (id: number) => void;
    onNavigateToListConversationPage: (id: number) => void;
  };
}

export const ResearchContextCard = ({
  title,
  description,
  id,
  callbacks,
  ...props
}: ResearchContextCardProps) => {
  return (
    <ShadcnCard {...props} className="max-w-sm">
      <CardContent
        className={cn(
          "flex flex-col items-center justify-between gap-medium",
          "w-full h-full overflow-hidden",
          "p-6",
          "px-7",
          "bg-neutral-100 dark:bg-neutral-800",
          "text-black dark:text-white",
          "border",
          "rounded-lg",
        )}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>

        <div className="flex flex-row items-center justify-between gap-4">
          <Button
            className="w-full"
            variant="default"
            size="default"
            label="Sources"
            onClick={() => callbacks.onNavigateToSourcesPage(id)}
          />
          <Button
            className="w-full"
            variant="default"
            size="default"
            label="Conversations"
            onClick={() => callbacks.onNavigateToListConversationPage(id)}
          />
        </div>
      </CardContent>
    </ShadcnCard>
  );
};
