"use client";
import { z } from "zod";
import { BaseAGGrid } from "./BaseAGGrid";
import { ColDef, SelectionChangedEvent } from "ag-grid-community";
import { useState } from "react";

const SourceDataRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  relativePath: z.string(),
  createdAt: z.string(),
});

/**
 * SourceDataRow is a type that represents the structure of the data that will be displayed in the AG Grid.
 */
export type SelectableSourceDataRow = z.infer<typeof SourceDataRowSchema>;

/**
 * SourceDataAGGridProps is an interface that defines the props for the SourceDataAGGrid component.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of SourceDataRow objects.
 * @param buttonsWithCallBack: an array of objects containing a reactComponent and a callbackFunction.
 */
export interface SelectableSourceDataAGGridProps {
  rowData: SelectableSourceDataRow[];
  isLoading: boolean;
  handleConfirmSelection: (selectedRows: SelectableSourceDataRow[]) => void;
  errorOverlayProps?: {
    errorStatus: boolean;
    overlayText: string;
  };
}

/**
 * SourceDataAGGrid is a react component that displays a table of source data in an AG Grid.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of SourceDataRow objects.
 * @param handleDownloadSourceData: a function that is called when the download button is clicked.
 * @param handleUploadSourceData: a function that is called when the upload button is clicked.
 * @param isLoading: a boolean that indicates whether the data is still loading.
 * @param errorOverlayProps: an object that contains the error status and overlay text.
 * @returns a react component that displays a table of source data in an AG Grid.
 */
export function SelectableSourceDataAGGrid(
  props: SelectableSourceDataAGGridProps,
) {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      headerName: "ID",
      filter: false,
      field: "id",
      flex: 0.3,
      minWidth: 100,
    },
    {
      headerName: "Name",
      field: "name",
      flex: 1.5,
    },
    {
      headerName: "Relative Path",
      field: "relativePath",
      flex: 2,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
    },
    {
      headerName: "",
      filter: false,
      flex: 0.5,
    },
  ]);

  const onSelectionChanged = (
    event: SelectionChangedEvent<SelectableSourceDataRow>,
  ) => {
    const selectedRows = event.api.getSelectedRows();
    props.handleConfirmSelection(selectedRows);
  };

  return (
    <div>
      <BaseAGGrid
        isLoading={props.isLoading}
        rowData={props.rowData}
        columnDefs={columnDefs}
        errorOverlayProps={props.errorOverlayProps}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  );
}
