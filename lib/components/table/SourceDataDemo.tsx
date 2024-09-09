"use client";
import { z } from "zod";
import { BaseAGGrid, componentWithCallBack } from "./BaseAGGrid";
import { ColDef } from "ag-grid-community";
import { useState } from "react";
import { Button as ShadcnButton } from "@/ui/button";

const SourceDataRowSchema = z.object({
  id: z.string(),
  type: z.literal("remote").default("remote").optional(),
  provider: z.literal("kernel#s3").default("kernel#s3").optional(),
  name: z.string(),
  relativePath: z.string(),
  createdAt: z.string(),
});

type TSourceDataRow = z.infer<typeof SourceDataRowSchema>;
// Download Button

type TDownloadButtonProps = {
  onClick: () => void;
  title: string;
  enabled: boolean;
};

const DownloadButton = (props: TDownloadButtonProps) => {
  return (
    <ShadcnButton
      variant="default"
      disabled={!props.enabled}
      title={props.title}
      onClick={props.onClick}
    >
      {props.title}
    </ShadcnButton>
  );
};

export interface SourceDataAGGridProps {
  isLoading: boolean;
  download: {
    isDownloading: boolean;
    progress: number;
    onDownload: (selectedRows: TSourceDataRow[]) => void;
  };
  rowData: TSourceDataRow[];
  buttonsWithCallBack?: componentWithCallBack<TSourceDataRow>[];
}

export function SourceDataAGGrid(props: SourceDataAGGridProps) {
  const downloadButton = ({ onClick }: { onClick: () => void }) => {
    return (
      <DownloadButton
        enabled={!props.download.isDownloading}
        title={
          props.download.isDownloading
            ? `Downloading ${props.download.progress}%`
            : "Download"
        }
        onClick={onClick}
      />
    );
  };

  const downloadCallback = (selectedRows: TSourceDataRow[]) => {
    props.download.onDownload(selectedRows);
  };

  const buttonsWithCallBack: componentWithCallBack<TSourceDataRow>[] = [
    {
      reactComponent: downloadButton,
      callbackFunction: downloadCallback,
    },
  ];

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
    <BaseAGGrid
      isLoading={props.isLoading}
      rowData={props.rowData}
      columnDefs={columnDefs}
      componentsWithCallBack={buttonsWithCallBack}
    />
  );
}
