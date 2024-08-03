import { z } from "zod";
import { BaseAGGrid, componentWithCallBack } from "./BaseAGGrid";
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

/**
 * SourceDataRow is a type that represents the structure of the data that will be displayed in the AG Grid.
 */
export type SourceDataRow = z.infer<typeof SourceDataRowSchema>;

/**
 * SourceDataAGGridProps is an interface that defines the props for the SourceDataAGGrid component.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of SourceDataRow objects.
 * @param buttonsWithCallBack: an array of objects containing a reactComponent and a callbackFunction.
 */
export interface SourceDataAGGridProps {
  rowData: SourceDataRow[];
  buttonsWithCallBack?: componentWithCallBack<SourceDataRow>[];
}

/**
 * SourceDataAGGrid is a react component that displays a table of source data in an AG Grid.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of SourceDataRow objects.
 * @param buttonsWithCallBack: an array of objects containing a reactComponent and a callbackFunction.
 */
export function SourceDataAGGrid({
  rowData,
  buttonsWithCallBack,
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
    {
      headerName: "Protocol",
      field: "protocol",
    },
  ]);

  return (
    <div>
      <BaseAGGrid
        maxGridHeight={760}
        gridWidth={1000}
        rowData={rowData}
        columnDefs={columnDefs}
        componentsWithCallBack={buttonsWithCallBack}
      />
    </div>
  );
}
