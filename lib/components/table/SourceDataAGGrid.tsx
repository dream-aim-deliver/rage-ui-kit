import { z } from "zod";
import { BaseAGGrid, RowSelectionProps } from "./BaseAGGrid";
import { ColDef } from "ag-grid-community";
import { useState } from "react";

const SourceDataRowSchema = z.object({
  id: z.number(),
  name: z.string(),
  relative_path: z.string(),
  type: z.string(),
  protocol: z.string(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type SourceDataRow = z.infer<typeof SourceDataRowSchema>;


export interface SourceDataAGGridProps {
  rowData: SourceDataRow[];
  rowSelectionProps?: RowSelectionProps<SourceDataRow>;
}

export function SourceDataAGGrid({ 
    rowData,
    rowSelectionProps,
}: SourceDataAGGridProps) {
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
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Relative Path",
      field: "relative_path",
    },
    {
      headerName: "Type",
      field: "type",
    },
    {
      headerName: "Protocol",
      field: "protocol",
    },
    {
      headerName: "Status",
      field: "status",
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
      <BaseAGGrid rowData={rowData} columnDefs={columnDefs} rowSelectionProps={rowSelectionProps} />
    </div>
  );
}
