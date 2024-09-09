"use client";

import { ColDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
// import "./ag-theme-sda.css";
import React, { useCallback, useMemo, useRef } from "react";

import { Button as ShadcnButton } from "@/components/button/index";
import { Input as ShadcnInput } from "@/ui/input";
import { Label as ShadcnLabel } from "@/ui/label";

import { cn } from "@/lib/utils/utils";
import { FilterX } from "lucide-react";
import { Spinner } from "../spinner";

/**
 * RowSelectionAction is a generic type that defines the structure of the functions that will be called when a component in the custom header of the AG Grid is clicked.
 * @param TRowData: the type of the data to be displayed in the AG Grid
 * @param selectedRows: the data of the visually selected rows
 * @returns an unknown value
 * @example
 * ```tsx
 * const alertRawCallBack = (selectedRows: SourceDataRow[]) => {
 *  alert(
 *    "Selected rows:\n\n" +
 *    selectedRows.map((row) => JSON.stringify(row)).join("\n\n"),
 *  );
 * };
 * ```
 */
export type RowSelectionAction<TRowData> = (
  selectedRows: TRowData[],
) => unknown;

/**
 * componentWithCallBack is a generic interface that defines the structure of the objects that can be passed in the componentsWithCallBack prop.
 * @param TRowData: the type of the data to be displayed in the AG Grid
 * @param reactComponent: a react component that will be rendered in the custom header of the AG Grid
 * @param callbackFunction: a function that will be called when the reactComponent is clicked
 * @returns an object containing a reactComponent and a callbackFunction
 * @example
 * ```tsx
 * const alertRawButton = ({ onClick }: { onClick: () => void }) => {
 *  return (
 *   <ShadcnButton
 *      label={"Alert raw data"}
 *      variant="default"
 *      onClick={onClick}
 *      title="Alert the raw data of the selected rows"
 *    />
 *  );
 * };
 *
 * const alertRawCallBack = (selectedRows: SourceDataRow[]) => {
 *  alert(
 *    "Selected rows:\n\n" +
 *    selectedRows.map((row) => JSON.stringify(row)).join("\n\n"),
 *  );
 * };
 *
 * const buttonsWithCallBack: componentWithCallBack<TRowData>[] = [
 *  {
 *   reactComponent: alertRawButton,
 *   callbackFunction: alertRawCallBack,
 * },
 * ];
 * ```
 */
export type componentWithCallBack<TRowData> = {
  reactComponent: React.ComponentType<{ onClick: () => void }>;
  callbackFunction: RowSelectionAction<TRowData>;
};

/**
 * BaseAGGridProps is a generic interface that defines the props for the BaseAGGrid component.
 * @param isLoading: a boolean that indicates whether the data is being loaded
 * @param TRowData: the type of the data to be displayed in the AG Grid
 * @param rowData: the data to be displayed in the AG Grid
 * @param columnDefs: the column definitions for the AG Grid
 * @param componentsWithCallBack: an array of objects containing a reactComponent and a callbackFunction
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
  componentsWithCallBack?: componentWithCallBack<TRowData>[];
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
 * @param componentsWithCallBack: an array of objects containing a reactComponent and a callbackFunction
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
  componentsWithCallBack: buttonsWithCallBack,
  additionalComponentsLeft,
  additionalComponentsCenter,
  additionalComponentsRight,
  errorOverlayProps = {
    errorStatus: false,
    overlayText: "",
  },
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

  // Made to override the default noRowsOverlayComponent of AG Grid, as it was showing a message out of place
  const NoRowsOverlayComponent: () => JSX.Element = () => <div></div>;

  // Custom error overlay component for the error state of the AG Grid
  const ErrorOverlayComponent = () => {
    return (
      <div>
        <div className={cn("overflow-auto h-fulll w-full")}>
          <p
            className={cn(
              "text-white bg-error-800 rounded-md p-large font-bold text-sm",
            )}
          >
            {errorOverlayProps.overlayText}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      id="base-ag-grid"
      className={cn("flex flex-col h-full w-full bg-neutral-800")}
    >
      <div
        id="table-top"
        className={cn(
          "flex flex-col gap-medium bg-neutral-800 p-medium rounded-md",
        )}
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
          <ShadcnLabel className={cn("text-white")}>Fuzzy search:</ShadcnLabel>
          <ShadcnInput
            type="text"
            id="ag-grid-filter-text-box"
            placeholder="enter text to search..."
            onInput={onFilterTextBoxChanged}
            className={cn("flex-1")}
          />
        </div>
      </div>

      {!errorOverlayProps.errorStatus ? (
        // Success state
        <div
          id="ag-grid-inner-component"
          className={cn("ag-theme-sda h-screen overflow-auto")}
          style={{ height: "80vh", width: "100vw" }}
        >
          <AgGridReact
            loading={isLoading}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={13}
            paginationPageSizeSelector={[13, 25, 50, 100]}
            noRowsOverlayComponent={NoRowsOverlayComponent}
            ref={gridRef}
            {...AGGridProps}
          />
        </div>
      ) : (
        // Error state
        <div
          id="ag-grid-inner-component"
          className={cn("ag-theme-sda h-screen overflow-auto")}
          style={{ height: "80vh", width: "100vw" }}
        >
          <AgGridReact
            rowData={[]}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={13}
            paginationPageSizeSelector={[13, 25, 50, 100]}
            noRowsOverlayComponent={ErrorOverlayComponent}
            ref={gridRef}
            {...AGGridProps}
          />
        </div>
      )}
    </div>
  );
}
