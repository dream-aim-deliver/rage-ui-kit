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

export type ConversationRow = z.infer<typeof ConversationRowSchema>;

export interface ConversationAGGridProps {
  rowData: ConversationRow[];
  buttonsWithCallBack?: componentWithCallBack<ConversationRow>[];
}

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
        rowData={rowData}
        columnDefs={columnDefs}
        componentsWithCallBack={buttonsWithCallBack}
      />
    </div>
  );
}
