"use client";

import { AgGridEvent, ColDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import React, { useCallback, useMemo, useRef } from "react";

import { Button as ShadcnButton } from "@/components/button/index";
import { Input as ShadcnInput } from "@/ui/input";
import { Label as ShadcnLabel } from "@/ui/label";

import { cn } from "@/lib/utils/utils";
import { FilterX } from "lucide-react";
import { Spinner } from "../spinner";
import useDarkMode from "@/lib/hooks/use-dark-mode";
import { twMerge } from "tailwind-merge";

/**
 * ToolbarAction is an interface that defines the structure of the objects that will be passed as props to the BaseAGGrid component.
 * @param Component: a React component that will be rendered as a button in the custom header of the AG Grid
 * @param callback: a function that will be called when the button is clicked. It will receive the selected rows as input
 * @param TRowData: the type of the data to be displayed in the AG Grid
 * @returns an object that contains a React Component and a Callback Function
 */
export type ToolbarAction<TRowData> = {
  Component: React.ReactNode;
  callback: (selectedRows: TRowData[]) => void;
};

/**
 * BaseAGGridProps is a generic interface that defines the props for the BaseAGGrid component.
 * @param isLoading: a boolean that indicates whether the data is being loaded
 * @param TRowData: the type of the data to be displayed in the AG Grid
 * @param rowData: the data to be displayed in the AG Grid
 * @param columnDefs: the column definitions for the AG Grid
 * @param toolbarActions: an array of objects containing a React Component and a Callback Function that receives the selected rows as input
 * @param additionalComponentsLeft: an array of react components that will be rendered on the left side of the custom header of the AG Grid
 * @param additionalComponentsCenter: an array of react components that will be rendered in the center of the custom header of the AG Grid
 * @param additionalComponentsRight: an array of react components that will be rendered on the right side of the custom header of the AG Grid
 * @param errorOverlayProps: an object containing the error status and the overlay text
 * @param overlayTextOnNoRows: the text to be displayed when there are no rows to display
 * @param AGGridProps: additional props for the AG Grid
 */
export interface BaseAGGridProps<TRowData> {
  isLoading: boolean;
  rowData: TRowData[];
  columnDefs: ColDef[];
  toolbarActions?: ToolbarAction<TRowData>[];
  additionalComponentsLeft?: React.ReactNode[];
  additionalComponentsCenter?: React.ReactNode[];
  additionalComponentsRight?: React.ReactNode[];
  errorOverlayProps?: {
    errorStatus: boolean;
    overlayText: string;
  };
  overlayTextOnNoRows?: string;
  AGGridProps?: AgGridReactProps;
}

/**
 * BaseAGGrid is a generic component that renders an AG Grid with a set of default features.
 * It is intended to be used as a base for more specific AG Grid components.
 * It provides a custom header that renders any component passed in the componentsWithCallBack prop, callback that will be put onClick event and will receive as input the data of the visually selected rows.
 * It also provides a fuzzy search bar that filters the rows based on the text input.
 * NOTE: theming is done in the ag-theme-sda.css file and we have not managed to make it work with tailwind, hence this component is ALWAYS in dark mode. So, make sure that the ouside components you pass as props are also in dark mode.
 * @param isLoading: a boolean that indicates whether the data is being loaded
 * @param rowData: the data to be displayed in the AG Grid
 * @param columnDefs: the column definitions for the AG Grid
 * @param toolbarActions: an array of objects containing a reactComponent and a callbackFunction
 * @param additionalComponentsLeft: an array of react components that will be rendered on the left side of the custom header of the AG Grid
 * @param additionalComponentsCenter: an array of react components that will be rendered in the center of the custom header of the AG Grid
 * @param additionalComponentsRight: an array of react components that will be rendered on the right side of the custom header of the AG Grid
 * @param errorOverlayProps: an object containing the error status and the overlay text
 * @param overlayTextOnNoRows: the text to be displayed when there are no rows to display
 * @param AGGridProps: additional props for the AG Grid
 * @returns a BaseAGGrid component
 */
export function BaseAGGrid<TRowData>({
  isLoading,
  rowData,
  columnDefs,
  toolbarActions,
  additionalComponentsLeft,
  additionalComponentsCenter,
  additionalComponentsRight,
  ...AGGridProps
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

  const handleResize = (event: AgGridEvent) => {
    event.api.sizeColumnsToFit();
  };

  const isDarkMode = useDarkMode();

  // Made to override the default noRowsOverlayComponent of AG Grid, as it was showing a message out of place
  const NoRowsOverlayComponent: () => JSX.Element = () => (
    <div>No data to show!</div>
  );

  return (
    <div
      id="base-ag-grid"
      className={cn(
        "flex flex-col h-full w-full bg-neutral-300 dark:bg-neutral-800",
      )}
    >
      <div
        id="table-top"
        className={cn("flex flex-col gap-medium p-medium rounded-md")}
      >
        <div
          id="table-top-button-group"
          className={cn("flex flex-row justify-center gap-medium")}
        >
          <div
            id="spinner"
            className={cn("flex w-small gap-small mr-medium items-center")}
          >
            {isLoading && <Spinner />}
          </div>

          <div id="additional-components-left" className={cn("flex gap-small")}>
            {additionalComponentsLeft}
          </div>

          <div
            id="table-top-prop-buttons"
            className={cn("flex flex-grow justify-center gap-small")}
          >
            {toolbarActions &&
              toolbarActions.map((data, index) => (
                <div
                  key={`table-top-prop-button-${index}`}
                  onClick={() =>
                    data.callback(gridRef.current!.api.getSelectedRows())
                  }
                >
                  {data.Component}
                </div>
              ))}

            {additionalComponentsCenter}
          </div>

          <div
            id="table-top-controls"
            className={cn("flex items-center gap-small")}
          >
            {additionalComponentsRight}

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
          <ShadcnLabel
            className={cn("dark:text-white")}
            aria-disabled={isLoading}
          >
            Fuzzy search:
          </ShadcnLabel>
          <ShadcnInput
            type="text"
            id="ag-grid-filter-text-box"
            placeholder="enter text to search..."
            onInput={onFilterTextBoxChanged}
            className={cn("flex-1")}
            disabled={isLoading}
          />
        </div>
      </div>
      <div
        className={twMerge(
          isDarkMode ? "ag-grid-theme-dark" : "ag-grid-theme-light",
          "grid grow w-full",
          "relative",
          "min-h-[300px]",
        )}
      >
        <AgGridReact
          loading={isLoading}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={25}
          paginationPageSizeSelector={[25, 50, 100]}
          noRowsOverlayComponent={NoRowsOverlayComponent}
          onGridSizeChanged={handleResize}
          ref={gridRef}
          {...AGGridProps}
        />
      </div>
    </div>
  );
}
