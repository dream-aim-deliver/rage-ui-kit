import { z } from "zod";
import { BaseAGGrid, componentWithCallBack } from "./BaseAGGrid";
import { ColDef } from "ag-grid-community";
import { useState } from "react";

const ConversationRowSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
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
  buttonsWithCallBack?: componentWithCallBack<ConversationRow>[];
}

/**
 * ConversationAGGrid is a react component that displays a table of conversations in an AG Grid.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of ConversationRow objects.
 * @param buttonsWithCallBack: an array of objects containing a reactComponent and a callbackFunction.
 */
export function ConversationAGGrid({
  rowData,
  buttonsWithCallBack,
}: ConversationAGGridProps) {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true, // only selects filtered rows, when filtering
      checkboxSelection: true,
      headerName: "ID",
      field: "id",
      filter: "agNumberColumnFilter",
      filterParams: {
        filterOptions: [
          "equals",
          "lessThan",
          "greaterThan",
          "inRange",
          "notEqual",
        ],
      },
    },
    {
      headerName: "Title",
      field: "title",
    },
    {
      headerName: "Created At",
      field: "created_at",
    },
    {
      headerName: "Updated At",
      field: "updated_at",
    },
  ]);

  return (
    <div>
      <BaseAGGrid
        maxGridHeight={760}
        gridWidth={730}
        rowData={rowData}
        columnDefs={columnDefs}
        componentsWithCallBack={buttonsWithCallBack}
      />
    </div>
  );
}
