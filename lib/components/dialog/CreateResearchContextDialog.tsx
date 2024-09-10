"use client";
import { Dialog as ShadcnDialog } from "@/ui/dialog";
import { Button } from "@/components/button/index";
import { cn } from "@/utils/utils";

import {
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

import { RemoteFile, TCreateResearchContextViewModel } from "../models";
import { useState } from "react";
import {
  CreateResearchContextForm,
  onSubmitInputValues,
} from "./CreateResearchContextForm";
import { CreateResearchContextSelectFilesView } from "./CreateResearchContextSelectFiles";
import { PlusCircle } from "lucide-react";
import { CreateResearchContextCreating } from "./CreateResearchContextCreating";

export interface CreateResearchContextDialogProps {
  /**
   * Callback function that will be called when the form is submitted.
   */
  onSubmit: (
    researchContextName: string,
    researchContextDescription: string,
    files: RemoteFile[],
  ) => void;
  clientFiles: RemoteFile[];
  viewModel: TCreateResearchContextViewModel;
}

/**
 * Create a new research context dialog
 */
export const CreateResearchContextDialog = (
  props: CreateResearchContextDialogProps,
) => {
  const [currentView, setCurrentView] = useState<"form" | "files" | "progress">(
    "form",
  );
  const [researchContextName, setResearchContextName] = useState<string>("");
  const [researchContextDescription, setResearchContextDescription] =
    useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<RemoteFile[]>([]);

  const selectFile = (file: RemoteFile) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(
        selectedFiles.filter((selectedFile) => selectedFile.id !== file.id),
      );
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleSubmit = () => {
    setCurrentView("progress");
    props.onSubmit(
      researchContextName,
      researchContextDescription,
      selectedFiles,
    );
  };
  return (
    <ShadcnDialog {...props}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" label={<PlusCircle />} />
      </DialogTrigger>

      <DialogContent
        className={cn(
          "flex flex-col items-center justify-between gap-large",
          "sm:max-w-md",
          "w-full",
          "py-8",
          "bg-neutral-100 dark:bg-neutral-800",
          "text-black dark:text-white",
        )}
      >
        <DialogClose asChild />
        {currentView === "form" && (
          <CreateResearchContextForm
            onSubmit={(inputValues: onSubmitInputValues) => {
              setResearchContextName(inputValues.researchContextName);
              setResearchContextDescription(
                inputValues.researchContextDescription,
              );
              setCurrentView("files");
            }}
          />
        )}
        {currentView === "files" && (
          <CreateResearchContextSelectFilesView
            files={props.clientFiles}
            selectFile={selectFile}
            onNext={handleSubmit}
            onPrevious={() => {
              setCurrentView("form");
            }}
          />
        )}
        {currentView === "progress" && (
          <CreateResearchContextCreating {...props.viewModel} />
        )}
      </DialogContent>
    </ShadcnDialog>
  );
};
