import { z } from "zod";
import { useState } from "react";
import { BaseAGGrid } from "@/lib/components";
import { ColDef } from "ag-grid-community";
import { CaseStudyTable } from "@/components/case-study/table/CaseStudyTable.tsx";

export const ClimateDataSchema = z.object({
  timestamp: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  CarbonMonoxideLevel: z.string(),
  PredictedWeather: z.string(),
  ActualWeather: z.string(),
});

export type TClimateData = z.infer<typeof ClimateDataSchema>;

export const ClimateDataTable: CaseStudyTable<TClimateData> = (props) => {
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
    {
      headerName: "Predicted Weather",
      field: "PredictedWeather",
    },
    {
      headerName: "Actual Weather",
      field: "ActualWeather",
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
