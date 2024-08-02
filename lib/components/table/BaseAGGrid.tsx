import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { useCallback, useMemo, useRef } from "react";

import { Button as ShadcnButton } from "@/components/button/index";
import { Input as ShadcnInput } from "@/ui/input";
import { Label as ShadcnLabel } from "@/ui/label";

import { cn } from "@/lib/utils/utils";
import { FilterX } from "lucide-react";

export type RowSelectionAction<TRowData> = (
  selectedRows: TRowData[],
) => unknown;

export type componentWithCallBack<TRowData> = {
  reactComponent: React.ComponentType<{ onClick: () => void }>;
  callbackFunction: RowSelectionAction<TRowData>;
};

export interface BaseAGGridProps<TRowData> {
  rowData: TRowData[];
  columnDefs: ColDef[];
  componentsWithCallBack?: componentWithCallBack<TRowData>[];
}

export function BaseAGGrid<TRowData>({
  rowData,
  columnDefs,
  componentsWithCallBack: buttonsWithCallBack,
}: BaseAGGridProps<TRowData>) {
  const gridRef = useRef<AgGridReact<TRowData>>(null);

  // AG Grid set up: default column definition, which can be overriden by columnDefs prop
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true, // e.g., all columns are sortable, unless opted out
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
      <div
        id="table-top"
        className={cn(
          "flex flex-col gap-medium dark:bg-neutral-800 bg-neutral-200 p-medium rounded-md",
        )}
      >
        <div
          id="table-top-button-group"
          className={cn("flex flex-row justify-center gap-medium")}
        >
          <div
            id="table-top-prop-buttons"
            className={cn("flex flex-grow justify-center gap-small")}
          >
            {buttonsWithCallBack &&
              buttonsWithCallBack.map(
                (
                  { reactComponent: ReactComponent, callbackFunction },
                  index,
                ) => (
                  <ReactComponent
                    key={`table-top-prop-button-${index}`}
                    onClick={() =>
                      callbackFunction(gridRef.current!.api.getSelectedRows())
                    }
                  />
                ),
              )}
          </div>

          <div
            id="table-top-controls"
            className={cn("flex items-center gap-small")}
          >
            <ShadcnButton
              onClick={clearColumnFilters}
              label={<FilterX />}
              variant="destructive"
              title="Clear all filters"
            />
          </div>
        </div>

        <div
          id="table-top-fuzzy-search-box"
          className={cn("flex items-center gap-small")}
        >
          <ShadcnLabel className={cn("dark:text-white text-black")}>
            Fuzzy search:
          </ShadcnLabel>
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
