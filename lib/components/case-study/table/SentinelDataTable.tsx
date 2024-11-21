import { z } from "zod";
import { BaseAGGrid } from "@/lib/components";
import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { CaseStudyTable } from "@/components/case-study/table/CaseStudyTable.tsx";

export const SentinelDataSchema = z.object({
  timestamp: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  CarbonMonoxideLevel: z.string(),
});

export type TSentinelData = z.infer<typeof SentinelDataSchema>;

export const SentinelDataTable: CaseStudyTable<TSentinelData> = (props) => {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "Date & Time",
      valueFormatter: (params) => {
        const currentDate = new Date(parseInt(params.data?.timestamp));
        return (
          currentDate.toLocaleDateString() +
          " " +
          currentDate.toLocaleTimeString()
        );
      },
    },
    {
      headerName: "Latitude",
      field: "latitude",
    },
    {
      headerName: "Longitude",
      field: "longitude",
    },
    {
      headerName: "CO Level",
      field: "CarbonMonoxideLevel",
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
