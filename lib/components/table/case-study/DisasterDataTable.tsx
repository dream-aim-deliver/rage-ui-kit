import { z } from "zod";
import { CaseStudyTableProps } from "@/components/table/case-study/CaseStudyTable.tsx";
import { BaseAGGrid } from "@/lib/components";
import {
  DefaultDateFilterParams,
  DefaultTextFilterParams,
} from "@/components/table/utils/filter-parameters.ts";
import { formatDate } from "@/components/table/utils/text-formatters.ts";
import { useState } from "react";
import { ColDef } from "ag-grid-community";

const DisasterDataSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  dateOccurred: z.date(),
  affectedPopulation: z.number().nonnegative().optional(),
});

export type TDisasterData = z.infer<typeof DisasterDataSchema>;

export const DisasterDataTable = (
  props: CaseStudyTableProps<TDisasterData>,
) => {
  const [columnDefs] = useState<ColDef[]>([
    {
      headerName: "ID",
      field: "id",
      maxWidth: 100,
      filter: true,
      sortable: true,
    },
    {
      headerName: "Disaster Name",
      field: "name",
      flex: 4,
      filter: true,
      filterParams: DefaultTextFilterParams,
    },
    {
      headerName: "Date Occurred",
      field: "dateOccurred",
      flex: 3,
      valueFormatter: (params) => {
        return formatDate(params.value); // A utility function for date formatting
      },
      filter: "agDateColumnFilter",
      filterParams: DefaultDateFilterParams,
    },
    {
      headerName: "Affected Population",
      field: "affectedPopulation",
      flex: 2,
      valueFormatter: (params) => {
        return params.value ? params.value.toLocaleString() : "N/A";
      },
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
