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
  goToConversation: (id: number) => void;
  handleNewConversation: (conversationTitle: string) => void;
  errorOverlayProps?: {
    errorStatus: boolean;
    overlayText: string;
  };
}

interface goToConversationButtonParams {
  context: {
    goToConversation: (id: string) => void;
  };
  data: {
    id: string;
  };
}

const goToConversationButton = (params: goToConversationButtonParams) => {
  const handleClick = () => {
    params.context.goToConversation(params.data.id);
  };

  return (
    <ShadcnButton
      label={"Start chat"}
      variant="default"
      onClick={handleClick}
    />
  );
};

const newConversationComponent = (
  handleNewConversation: (title: string) => void,
) => {
  // Wrapper to pass it as a buttonAction to the dialog
  const newConversationAction = (inputValues: buttonActionInputValues) => {
    handleNewConversation(inputValues.conversationTitle);
  };

  return <CreateConversationDialog buttonAction={newConversationAction} />;
};

/**
 * ConversationAGGrid is a react component that displays a table of conversations in an AG Grid.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of ConversationRow objects.
 * @param buttonsWithCallBack: an array of objects containing a reactComponent and a callbackFunction.
 */
export function ConversationAGGrid(props: ConversationAGGridProps) {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      filter: false,
      field: "id",
      flex: 0.6,
    },
    {
      headerName: "Title",
      field: "title",
      flex: 5,
    },
    {
      headerName: "Created At",
      field: "created_at",
      flex: 2,
    },
    {
      headerName: "",
      filter: false,
      flex: 1,
      cellRenderer: goToConversationButton,
    },
  ]);

  const gridContext = { goToConversation: props.goToConversation };

  return (
    <div>
      <BaseAGGrid
        isLoading={props.isLoading}
        rowData={props.rowData}
        columnDefs={columnDefs}
        additionalComponentsLeft={[
          newConversationComponent(props.handleNewConversation),
        ]}
        errorOverlayProps={props.errorOverlayProps}
        // @ts-expect-error TODO: fix typing here somehow, passing "AGGridProps = { {context = ... } }" to "BaseAGGrid" doesn't work
        context={gridContext}
      />
    </div>
  );
}
