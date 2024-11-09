"use client";

import { ColDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import React, { useCallback, useRef, useState } from "react";

import { Input as ShadcnInput } from "@/ui/input";

import { cn } from "@/lib/utils/utils";
import useDarkMode from "@/lib/hooks/use-dark-mode";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/ui/skeleton.tsx";
import { ErrorOverlay } from "@/components/table/overlays/ErrorOverlay.tsx";
import { NothingFoundOverlay } from "@/components/table/overlays/NothingFoundOverlay.tsx";

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
export interface BaseAGGridProps<TRowData> extends AgGridReactProps {
  isLoading: boolean;
  rowData: TRowData[];
  columnDefs: ColDef[];
  errorOverlayProps?: {
    errorStatus: boolean;
    overlayText: string;
  };
  overlayTextOnNoRows?: string;
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
 * @param errorOverlayProps: an object containing the error status and the overlay text
 * @param overlayTextOnNoRows: the text to be displayed when there are no rows to display
 * @param props: additional props for the AG Grid
 * @returns a BaseAGGrid component
 */
export function BaseAGGrid<TRowData>({
  isLoading,
  rowData,
  columnDefs,
  errorOverlayProps,
  ...props
}: BaseAGGridProps<TRowData>) {
  const gridRef = useRef<AgGridReact<TRowData>>(null);

  // TODO: get the value from form event
  // AG Grid Quick Filter set up:
  // to enable a fuzzy search bar
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("ag-grid-filter-text-box") as HTMLInputElement)
        .value,
    );
  }, []);

  const isDarkMode = useDarkMode();

  // Whether the table component is ready to be displayed
  const [isTableLoaded, setIsTableLoaded] = useState<boolean>(false);

  const onGridReady = () => {
    setIsTableLoaded(true);
  };

  // Made to override the default noRowsOverlayComponent of AG Grid, as it was showing a message out of place
  const NoRowsOverlayComponent: () => React.JSX.Element = () => {
    if (errorOverlayProps) {
      return <ErrorOverlay message={errorOverlayProps.overlayText} />;
    } else {
      return <NothingFoundOverlay />;
    }
  };

  return (
    <div id="base-ag-grid" className={cn("flex flex-col grow w-full")}>
      <div
        id="table-top-fuzzy-search-box"
        className="flex items-center gap-small my-3"
      >
        <ShadcnInput
          type="text"
          id="ag-grid-filter-text-box"
          placeholder="Search for close matches"
          onInput={onFilterTextBoxChanged}
          className="flex-1"
          disabled={isLoading}
        />
      </div>
      <div
        className={twMerge(
          isDarkMode ? "ag-grid-theme-dark" : "ag-grid-theme-light",
          "grid grow w-full",
          "relative",
          "min-h-[300px]",
        )}
      >
        {!isTableLoaded && (
          <Skeleton className="absolute flex items-center justify-center w-full h-full rounded-b-none" />
        )}
        <AgGridReact
          loading={isLoading}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={25}
          paginationPageSizeSelector={[25, 50, 100]}
          noRowsOverlayComponent={NoRowsOverlayComponent}
          ref={gridRef}
          onGridReady={onGridReady}
          {...props}
        />
      </div>
    </div>
  );
}
