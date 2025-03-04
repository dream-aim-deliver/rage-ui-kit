import { z } from "zod";
import { useState } from "react";
import { BaseAGGrid } from "@/lib/components";
import { ColDef } from "ag-grid-community";
import { CaseStudyTable } from "@/components/case-study/table/CaseStudyTable.tsx";

export const SwissGridDataSchema = z.object({
  model: z.string(),
  timestamp: z.string(),
  prediction: z.string(),
  confidence: z.number(),
});

export type TSwissGridData = z.infer<typeof SwissGridDataSchema>;

export const SwissGridDataTable: CaseStudyTable<TSwissGridData> = (props) => {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Date & Time",
      valueFormatter: (params) => {
        const currentDate = new Date(parseInt(params.data?.timestamp) * 1000);
        return (
          currentDate.toLocaleDateString() +
          " " +
          currentDate.toLocaleTimeString()
        );
      },
    },
    {
      headerName: "Model",
      field: "model",
      valueFormatter: (params) => {
        if (!params.value) return "";
        return params.value
          .split("_")
          .map(
            (word: string) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
      },
    },
    {
      headerName: "Prediction",
      field: "prediction",
    },
    {
      headerName: "Confidence",
      field: "confidence",
      valueFormatter: (params) => {
        if (typeof params.value !== "number") return "";
        return params.value.toFixed(5);
      },
    },
  ]);

  const errorOverlayProps = props.error
    ? { errorStatus: true, overlayText: props.error }
    : undefined;

  return (
    <BaseAGGrid
      isLoading={props.isLoading}
      rowData={props.rowData}
      columnDefs={columnDefs}
      errorOverlayProps={errorOverlayProps}
    />
  );
};
