"use client";
import { Dialog as ShadcnDialog } from "@/ui/dialog";
import { Button } from "@/components/button/index";
import { cn } from "@/utils/utils";

import {
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

import { TCreateResearchContextViewModel } from "../models";
import { useState } from "react";
import {
  CreateResearchContextForm,
  onSubmitInputValues,
} from "./CreateResearchContextForm";
import { CreateResearchContextSelectFilesView } from "./CreateResearchContextSelectFiles";
import { PlusCircle } from "lucide-react";
import { CreateResearchContextCreating } from "./CreateResearchContextCreating";
import { SelectableSourceDataRow } from "../table/SelectableSourceDataAGGrid";
import { LabelWithIcon } from "@/components/button/LabelWithIcon.tsx";
export interface CreateResearchContextDialogProps {
  /**
   * Callback function that will be called when the form is submitted.
   */
  onSubmit: (
    researchContextName: string,
    researchContextDescription: string,
    files: SelectableSourceDataRow[],
  ) => void;
  clientFiles: SelectableSourceDataRow[];
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
  const [selectedFiles, setSelectedFiles] = useState<SelectableSourceDataRow[]>(
    [],
  );

  const refresh = () => {
    setCurrentView("form");
    setResearchContextName("");
    setResearchContextDescription("");
    setSelectedFiles([]);
  };

  const handleConfirmSelection = (selectedRows: SelectableSourceDataRow[]) => {
    setSelectedFiles(selectedRows);
  };

  const handleSubmit = () => {
    setCurrentView("progress");
    props.onSubmit(
      researchContextName,
      researchContextDescription,
      selectedFiles,
    );
  };

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) return;

    if (currentView === "progress") {
      if (
        props.viewModel.status === "success" ||
        props.viewModel.status === "error"
      ) {
        refresh();
      }
    } else {
      // The selected files have to be refreshed as the table won't render them on reopening
      setSelectedFiles([]);
    }
  };

  return (
    <ShadcnDialog {...props} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          label={
            <LabelWithIcon
              label="Create a research context"
              Icon={PlusCircle}
            />
          }
          className={cn(
            "fixed",
            "bottom-8 right-8",
            "z-50",
            "rounded-full p-4",
            "shadow-xl",
          )}
        />
      </DialogTrigger>

      <DialogContent
        className={cn(
          "flex flex-col items-center justify-between gap-large",
          "max-w-[90%] rounded-md",
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
            sourceDataList={props.clientFiles}
            isLoading={false} // TODO: add loading state
            handleConfirmSelection={handleConfirmSelection}
            onNext={selectedFiles.length === 0 ? undefined : handleSubmit}
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
