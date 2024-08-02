import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useRef } from "react";

import { Button as ShadcnButton } from "@/components/button/index";
import { Input as ShadcnInput } from "@/ui/input";
import { Label as ShadcnLabel } from "@/ui/label";

import { cn } from "@/lib/utils/utils";


export type RowSelectionAction<TRowData> = (selectedRows: TRowData[]) => void;

export type RowSelectionProps<TRowData> = {
    rowSelectionAction: RowSelectionAction<TRowData>;
    rowSelectionActionLabel: string;
};

export interface BaseAGGridProps<TRowData> {
  rowData: TRowData[];
  columnDefs: ColDef[];
  rowSelectionProps?: RowSelectionProps<TRowData>;
}

export function BaseAGGrid<TRowData>({
  rowData,
  columnDefs,
  rowSelectionProps
}: BaseAGGridProps<TRowData>) {
  const gridRef = useRef<AgGridReact<TRowData>>(null);

  // AG Grid set up:
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true,
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: [
          "contains",
          "notContains",
          "startsWith",
          "endsWith",
          "equals",
        ],
      },
      floatingFilter: true,
    };
  }, []);

  function clearColumnFilters() {
    gridRef.current!.api.setFilterModel(null);
  }

  // AG Grid Quick Filter set up:
  // to enable a fuzzy search bar
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("ag-grid-filter-text-box") as HTMLInputElement)
        .value,
    );
  }, []);

  return (
    <div id="base-ag-grid" className={cn("flex flex-col")}>

      <div id="table-top" className={cn("flex flex-col gap-medium bg-neutral-800 p-medium rounded-md")}>

        <div id="table-top-button-group" className={cn("flex flex-row justify-center gap-medium")}>

          {rowSelectionProps && (
            <ShadcnButton
              onClick={() => rowSelectionProps.rowSelectionAction(gridRef.current!.api.getSelectedRows())}
              label={rowSelectionProps.rowSelectionActionLabel}
              variant="default"
            />
          )}

          <ShadcnButton 
            onClick={clearColumnFilters}
            label="Clear Filters"
            variant="destructive"
          />

        </div>

        <div id="table-top-fuzzy-search-box" className={cn("flex items-center gap-small")}>
          <ShadcnLabel className={cn("text-white")}>Fuzzy Search: </ShadcnLabel>
          <ShadcnInput
            type="text"
            id="ag-grid-filter-text-box"
            placeholder="enter text to search..."
            onInput={onFilterTextBoxChanged}
            className={cn("flex-1")}
          />
        </div>

      </div>

      <div
        id="ag-grid-inner-component"
        className={"ag-theme-quartz-dark"}
        style={{ height: 800, width: 1000 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          ref={gridRef}
        />
      </div>
    </div>
  );
}
