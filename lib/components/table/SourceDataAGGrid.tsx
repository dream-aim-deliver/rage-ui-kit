import { z } from "zod";
import { BaseAGGrid, componentWithCallBack } from "./BaseAGGrid";
import { ColDef } from "ag-grid-community";
import { useState } from "react";

const SourceDataRowSchema = z.object({
  id: z.string(),
  type: z.literal('remote').default("remote").optional(),
  provider: z.literal('kernel#s3').default("kernel#s3").optional(),
  name: z.string(),
  relativePath: z.string(),
  createdAt: z.string(),
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
  isLoading: boolean;
  rowData: SourceDataRow[];
  buttonsWithCallBack?: componentWithCallBack<SourceDataRow>[];
  props?: any;
}

/**
 * SourceDataAGGrid is a react component that displays a table of source data in an AG Grid.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of SourceDataRow objects.
 * @param buttonsWithCallBack: an array of objects containing a reactComponent and a callbackFunction.
 */
export function SourceDataAGGrid({
  isLoading,
  rowData,
  buttonsWithCallBack,
  props
}: SourceDataAGGridProps) {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true, // only selects filtered rows, when filtering
      checkboxSelection: true,
      headerName: "ID",
      field: "id",
      flex: 2,
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
      flex: 4,
    },
    {
      headerName: "Relative Path",
      field: "relativePath",
      flex: 8,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 4,
    },
  ]);



  return (
    <div>
      <BaseAGGrid
        isLoading={isLoading}
        maxGridHeight={760}
        gridWidth={900}
        rowData={rowData}
        columnDefs={columnDefs}
        componentsWithCallBack={buttonsWithCallBack}
        {...props}
      />
    </div>
  );
}
