import { ColDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./ag-theme-sda.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
 */
export type componentWithCallBack<TRowData> = {
  reactComponent: React.ComponentType<{ onClick: () => void }>;
  callbackFunction: RowSelectionAction<TRowData>;
};

export type errorOverlayProps = {
  errorStatus: boolean;
  overlayText: string;
};

/**
 * BaseAGGridProps is a generic interface that defines the props for the BaseAGGrid component.
 * @param TRowData: the type of the data to be displayed in the AG Grid
 * @param rowData: the data to be displayed in the AG Grid
 * @param columnDefs: the column definitions for the AG Grid
 * @param maxGridHeight: the maximum height of the AG Grid
 * @param gridWidth: the width of the AG Grid
 * @param componentsWithCallBack: an array of objects containing a reactComponent and a callbackFunction
 */
export interface BaseAGGridProps<TRowData> {
  isLoading: boolean;
  rowData: TRowData[];
  columnDefs: ColDef[];
  maxGridHeight?: number;
  gridWidth?: number | string;
  componentsWithCallBack?: componentWithCallBack<TRowData>[];
  additionalComponentsLeft?: React.ReactNode[];
  additionalComponentsCenter?: React.ReactNode[];
  additionalComponentsRight?: React.ReactNode[];
  errorOverlayProps?: errorOverlayProps;
  overlayTextOnNoRows?: string;
  AGGridProps?: AgGridReactProps;
}

/**
 * BaseAGGrid is a generic component that renders an AG Grid with a set of default features.
 * It is intended to be used as a base for more specific AG Grid components.
 * It provides a custom header that renders any component passed in the componentsWithCallBack prop, callback that will be put onClick event and will receive as input the data of the visually selected rows.
 * It also provides a fuzzy search bar that filters the rows based on the text input.
 * NOTE: theming is done in the ag-theme-sda.css file and we have not managed to make it work with tailwind, hence this component is ALWAYS in dark mode. So, make sure that the ouside components you pass as props are also in dark mode.
 * @param rowData: the data to be displayed in the AG Grid
 * @param columnDefs: the column definitions for the AG Grid
 * @param maxGridHeight: the maximum height of the AG Grid (default: 760)
 * @param gridWidth: the width of the AG Grid (default: 1000)
 * @param componentsWithCallBack: an array of objects containing a reactComponent and a callbackFunction
 * @returns a BaseAGGrid component
 */
export function BaseAGGrid<TRowData>({
  isLoading,
  rowData,
  columnDefs,
  maxGridHeight = 760,
  gridWidth = 1000,
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

  const [gridHeight, setGridHeight] = useState(800); // Default height
  useEffect(() => {
    const rowHeight = 40;
    const minGridHeight = 100;
    const calculatedHeight = Math.min(
      Math.max(minGridHeight, rowHeight * rowData.length + 200),
      maxGridHeight,
    );
    setGridHeight(calculatedHeight);
  }, [rowData, maxGridHeight]);

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

  /**
   * Made to override the default noRowsOverlayComponent of AG Grid, as it was showing an out-of-place message.
   */
  const noRowsOverlayComponent: () => JSX.Element = () => <div> </div>;

  const errorOverlayComponent = () => {
    return (
      <div className={cn("overflow-auto h-full")}>
        <p
          className={cn(
            "text-white bg-error-800 rounded-md p-large font-bold text-sm",
          )}
        >
          {errorOverlayProps.overlayText}
        </p>
      </div>
    );
  };

  return (
    <div id="base-ag-grid" className={cn("flex flex-col")}>
      <div
        id="table-top"
        className={cn(
          "flex flex-col gap-medium bg-neutral-800  p-medium rounded-md",
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
        <div
          id="ag-grid-inner-component"
          className={cn("ag-theme-sda")}
          style={{ height: gridHeight, width: gridWidth }}
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
            noRowsOverlayComponent={noRowsOverlayComponent}
            ref={gridRef}
            {...AGGridProps}
          />
        </div>
      ) : (
        <div
          id="ag-grid-inner-component"
          className={cn("ag-theme-sda h-screen")}
          style={{ height: 760, width: gridWidth }}
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
            noRowsOverlayComponent={errorOverlayComponent}
            ref={gridRef}
            {...AGGridProps}
          />
        </div>
      )}
    </div>
  );
}
