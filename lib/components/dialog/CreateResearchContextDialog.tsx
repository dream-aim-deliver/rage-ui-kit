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
  return (
    <ShadcnDialog {...props}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          label={
            <LabelWithIcon
              label="Create a research context"
              Icon={PlusCircle}
            />
          }
        />
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
            sourceDataList={props.clientFiles}
            isLoading={false} // TODO: add loading state
            handleConfirmSelection={handleConfirmSelection}
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
