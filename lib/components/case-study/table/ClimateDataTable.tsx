import { z } from "zod";
import { useState } from "react";
import { DefaultTextFilterParams } from "@/components/table/utils/filter-parameters.ts";
import { BaseAGGrid } from "@/lib/components";
import { ColDef } from "ag-grid-community";
import { CaseStudyTable } from "@/components/case-study/table/CaseStudyTable.tsx";

export const ClimateDataSchema = z.object({
  id: z.string().uuid(),
  location: z.string().min(1),
  temperature: z.number().min(-100).max(100),
  humidity: z.number().min(0).max(100),
});

export type TClimateData = z.infer<typeof ClimateDataSchema>;

export const ClimateDataTable: CaseStudyTable<TClimateData> = (props) => {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      field: "id",
      maxWidth: 100,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Location",
      field: "location",
      flex: 4,
      filter: true,
      filterParams: DefaultTextFilterParams,
    },
    {
      headerName: "Temperature (°C)",
      field: "temperature",
      flex: 2,
      valueFormatter: (params) => `${params.value}°C`,
      filter: "agNumberColumnFilter",
      sortable: true,
    },
    {
      headerName: "Humidity (%)",
      field: "humidity",
      flex: 2,
      valueFormatter: (params) => `${params.value}%`,
      filter: "agNumberColumnFilter",
      sortable: true,
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
