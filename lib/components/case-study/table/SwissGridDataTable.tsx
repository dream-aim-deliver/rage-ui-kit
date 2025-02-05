import { z } from "zod";
import { useState } from "react";
import { BaseAGGrid } from "@/lib/components";
import { ColDef } from "ag-grid-community";
import { CaseStudyTable } from "@/components/case-study/table/CaseStudyTable.tsx";

export const SwissGridDataSchema = z.object({
  timestamp: z.string(),
  prediction_unified: z.string(),
  prediction_benzau: z.string(),
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
      headerName: "Unified Prediction",
      field: "prediction_unified",
    },
    {
      headerName: "Benzau Prediction",
      field: "prediction_benzau",
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
