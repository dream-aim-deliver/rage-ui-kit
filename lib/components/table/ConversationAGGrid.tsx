"use client";
import { z } from "zod";
import { BaseAGGrid } from "./BaseAGGrid";
import { ColDef } from "ag-grid-community";
import { useState } from "react";

import { Button as ShadcnButton } from "@/components/button/index";
import {
  buttonActionInputValues,
  CreateConversationDialog,
} from "../dialog/CreateConversationDialog";
import { formatDate } from "@/components/table/utils/text-formatters.ts";
import {
  DefaultDateFilterParams,
  DefaultTextFilterParams,
} from "@/components/table/utils/filter-parameters.ts";
import { buttonCellStyle } from "@/components/table/utils/cell-styles.ts";

const ConversationRowSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
});

/**
 * ConversationRow is a type that represents the structure of the data that will be displayed in the AG Grid.
 */
export type ConversationRow = z.infer<typeof ConversationRowSchema>;

/**
 * ConversationAGGridProps is an interface that defines the props for the ConversationAGGrid component.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of ConversationRow objects.
 * @param buttonsWithCallBack: an array of objects containing a reactComponent and a callbackFunction.
 */
export interface ConversationAGGridProps {
  rowData: ConversationRow[];
  isLoading: boolean;
  newConversationIsEnabled: boolean;
  handleGoToConversation: (id: number) => void;
  handleNewConversation: (conversationTitle: string) => void;
  errorOverlayProps?: {
    errorStatus: boolean;
    overlayText: string;
  };
}

interface GoToConversationButtonParams {
  context: {
    handleGoToConversation: (id: string) => void;
  };
  data: {
    id: string;
  };
}

const GoToConversationButton = (params: GoToConversationButtonParams) => {
  const handleClick = () => {
    params.context.handleGoToConversation(params.data.id);
  };

  return (
    <ShadcnButton
      className="h-8"
      label={"Start chat"}
      variant="default"
      onClick={handleClick}
    />
  );
};

const NewConversationComponent = ({
  isEnabled,
  handleNewConversation,
}: {
  isEnabled: boolean;
  handleNewConversation: (title: string) => void;
}) => {
  // Wrapper to pass it as a buttonAction to the dialog
  const newConversationAction = (inputValues: buttonActionInputValues) => {
    handleNewConversation(inputValues.conversationTitle);
  };

  return (
    <CreateConversationDialog
      isEnabled={isEnabled}
      buttonAction={newConversationAction}
    />
  );
};

/**
 * ConversationAGGrid is a react component that displays a table of conversations in an AG Grid.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of ConversationRow objects.
 * @param isLoading: a boolean that indicates whether the data is still loading.
 * @param handleGoToConversation: a function that is called when the "Go to conversation" button is clicked.
 * @param handleNewConversation: a function that is called when the "New conversation" button is clicked.
 * @param errorOverlayProps: an object that contains the error status and overlay text.
 */
export function ConversationAGGrid(props: ConversationAGGridProps) {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      field: "id",
      maxWidth: 100,
    },
    {
      headerName: "Title",
      field: "title",
      flex: 5,
      filter: true,
      filterParams: DefaultTextFilterParams,
    },
    {
      headerName: "Created At",
      field: "created_at",
      flex: 2,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
      filter: "agDateColumnFilter",
      filterParams: DefaultDateFilterParams,
    },
    {
      headerName: "",
      flex: 1,
      sortable: false,
      width: 150,
      cellRenderer: GoToConversationButton,
      cellStyle: buttonCellStyle,
    },
  ]);

  const gridContext = { handleGoToConversation: props.handleGoToConversation };

  return (
    <div className="flex flex-col grow space-y-3">
      <BaseAGGrid
        isLoading={props.isLoading}
        rowData={props.rowData}
        columnDefs={columnDefs}
        errorOverlayProps={props.errorOverlayProps}
        // @ts-expect-error TODO: fix typing here somehow, passing "AGGridProps = { {context = ... } }" to "BaseAGGrid" doesn't work
        context={gridContext}
      />
      <NewConversationComponent
        isEnabled={props.newConversationIsEnabled}
        handleNewConversation={props.handleNewConversation}
      />
    </div>
  );
}
