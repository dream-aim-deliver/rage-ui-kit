"use client";
import { z } from "zod";
import { BaseAGGrid } from "./BaseAGGrid";
import { ColDef } from "ag-grid-community";
import { useState } from "react";

import { Button as ShadcnButton } from "@/components/button/index";

const SourceDataRowSchema = z.object({
  id: z.string(),
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
  rowData: SourceDataRow[];
  isLoading: boolean;
  isUploading: boolean;
  enableUpload: boolean;
  handleDownloadSourceData: (name: string, relativePath: string) => void;
  handleUploadSourceData: () => void;
  errorOverlayProps?: {
    errorStatus: boolean;
    overlayText: string;
  };
}

interface DownloadSourceDataButtonParams {
  context: {
    handleDownloadSourceData: (name: string, relativePath: string) => void;
  };
  data: {
    name: string;
    relativePath: string;
  };
}

const DownloadSourceDataButton = (params: DownloadSourceDataButtonParams) => {
  const handleClick = () => {
    params.context.handleDownloadSourceData(
      params.data.name,
      params.data.relativePath,
    );
  };

  return (
    <ShadcnButton label={"Download"} variant="default" onClick={handleClick} />
  );
};

const UploadSourceDataComponent = (
  enableUpload: boolean,
  isUploading: boolean,
  handleUploadSourceData: () => void,
) => {
  if (!enableUpload) {
    return null;
  }

  if (isUploading) {
    return (
      <ShadcnButton label={"Uploading..."} variant="default" disabled={true} />
    );
  } else {
    return (
      <ShadcnButton
        label={"Upload"}
        variant="default"
        onClick={handleUploadSourceData}
      />
    );
  }
};

/**
 * SourceDataAGGrid is a react component that displays a table of source data in an AG Grid.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of SourceDataRow objects.
 * @param handleDownloadSourceData: a function that is called when the download button is clicked.
 * @param handleUploadSourceData: a function that is called when the upload button is clicked.
 * @param isLoading: a boolean that indicates whether the data is still loading.
 * @param errorOverlayProps: an object that contains the error status and overlay text.
 * @returns a react component that displays a table of source data in an AG Grid.
 */
export function SourceDataAGGrid(props: SourceDataAGGridProps) {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      filter: false,
      field: "id",
      flex: 0.3,
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
      cellRenderer: DownloadSourceDataButton,
    },
  ]);

  const gridContext = {
    handleDownloadSourceData: props.handleDownloadSourceData,
  };

  return (
    <BaseAGGrid
      isLoading={props.isLoading}
      rowData={props.rowData}
      columnDefs={columnDefs}
      additionalComponentsLeft={[
        UploadSourceDataComponent(
          props.enableUpload,
          props.isUploading,
          props.handleUploadSourceData,
        ),
      ]}
      errorOverlayProps={props.errorOverlayProps}
      // @ts-expect-error TODO: fix typing here somehow, passing "AGGridProps = { {context = ... } }" to "BaseAGGrid" doesn't work
      context={gridContext}
    />
  );
}
