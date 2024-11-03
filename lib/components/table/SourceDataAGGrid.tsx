"use client";
import { z } from "zod";
import { BaseAGGrid } from "./BaseAGGrid";
import { ColDef } from "ag-grid-community";
import { useState } from "react";

import { Button as ShadcnButton } from "@/components/button/index";
import { formatDate } from "@/components/table/utils/text-formatters.ts";
import {
  DefaultDateFilterParams,
  DefaultTextFilterParams,
} from "@/components/table/utils/filter-parameters.ts";
import { buttonCellStyle } from "@/components/table/utils/cell-styles.ts";

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
    <ShadcnButton
      className="h-8"
      label={"Download"}
      variant="default"
      onClick={handleClick}
    />
  );
};

const UploadSourceDataComponent = ({
  enableUpload,
  isUploading,
  handleUploadSourceData,
}: {
  enableUpload: boolean;
  isUploading: boolean;
  handleUploadSourceData: () => void;
}) => {
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
      field: "id",
      maxWidth: 100,
    },
    {
      headerName: "Name",
      field: "name",
      flex: 1.5,
      filter: true,
      filterParams: DefaultTextFilterParams,
    },
    {
      headerName: "Relative Path",
      field: "relativePath",
      sortable: false,
      flex: 2,
      filter: true,
      filterParams: DefaultTextFilterParams,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
      valueFormatter: (params) => {
        return formatDate(params.value);
      },
      filter: "agDateColumnFilter",
      filterParams: DefaultDateFilterParams,
    },
    {
      headerName: "",
      filter: false,
      sortable: false,
      width: 150,
      cellRenderer: DownloadSourceDataButton,
      cellStyle: buttonCellStyle,
    },
  ]);

  // TODO: pass it with cell renderer parameters instead of context
  const gridContext = {
    handleDownloadSourceData: props.handleDownloadSourceData,
  };

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
      <UploadSourceDataComponent
        enableUpload={props.enableUpload}
        isUploading={props.isUploading}
        handleUploadSourceData={props.handleUploadSourceData}
      />
    </div>
  );
}
