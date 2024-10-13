import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";
import { z } from "zod";
import { RegularTable } from "./RegularTable";

const SourceDataRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  relativePath: z.string(),
  createdAt: z.string(),
});

/**
 * SourceDataRow is a type that represents the structure of the data that will be displayed in the AG Grid.
 */
export type TSourceDataRow = z.infer<typeof SourceDataRowSchema>;

/**
 * SourceDataAGGridProps is an interface that defines the props for the SourceDataAGGrid component.
 * @param rowData: the data to be displayed in the AG Grid. Must be an array of SourceDataRow objects.
 */
export interface SourceDataAGGridProps {
  rowData: TSourceDataRow[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SourceDataRegularTable = ({ ...props }) => {
  const tableRef = useRef<AgGridReact<TSourceDataRow>>(null);
  const [columnDefs] = useState([
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Relative Path",
      field: "relativePath",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      sortable: true,
      filter: true,
      flex: 1,
    },
  ]);

  return (
    <RegularTable tableRef={tableRef} columnDefs={columnDefs} {...props} />
  );
};
