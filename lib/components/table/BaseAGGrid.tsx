"use client";

import { ColDef } from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Input as ShadcnInput } from "@/ui/input";

import { cn } from "@/lib/utils/utils";
import useDarkMode from "@/lib/hooks/use-dark-mode";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/ui/skeleton.tsx";
import { ErrorOverlay } from "@/components/table/overlays/ErrorOverlay.tsx";
import { NothingFoundOverlay } from "@/components/table/overlays/NothingFoundOverlay.tsx";
import { LoadingOverlay } from "@/components/table/overlays/LoadingOverlay.tsx";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";

export const SimplePaginationPanel = (props: {
  currentPageRef: RefObject<HTMLSpanElement>;
  totalPagesRef: RefObject<HTMLSpanElement>;
  previousPageRef: RefObject<HTMLButtonElement>;
  nextPageRef: RefObject<HTMLButtonElement>;
  lastPageRef: RefObject<HTMLButtonElement>;
  firstPageRef: RefObject<HTMLButtonElement>;
  containerRef: RefObject<HTMLDivElement>;
}) => {
  const enabledTextClasses = "text-neutral-800 dark:text-neutral-100";
  const disabledTextClasses =
    "disabled:text-neutral-400 disabled:dark:text-neutral-500";
  const buttonClasses = twMerge(
    "text-l",
    "px-1",
    enabledTextClasses,
    disabledTextClasses,
  );

  return (
    <div
      className={twMerge(
        "flex items-center justify-center",
        enabledTextClasses,
        "py-2 !m-0",
        "bg-neutral-200 dark:bg-neutral-700",
        "border border-solid",
        "border-neutral-900 dark:border-neutral-100",
        "border-opacity-10 dark:border-opacity-10",
        "rounded-b-md",
      )}
    >
      <div className="flex justify-center invisible" ref={props.containerRef}>
        <button
          disabled={true}
          ref={props.firstPageRef}
          className={buttonClasses}
        >
          <HiOutlineChevronDoubleLeft />
        </button>
        <button
          disabled={true}
          ref={props.previousPageRef}
          className={buttonClasses}
        >
          <HiOutlineChevronLeft />
        </button>
        <span className="px-3">
          Page <span ref={props.currentPageRef}>0</span> of{" "}
          <span ref={props.totalPagesRef}>0</span>
        </span>
        <button
          disabled={true}
          ref={props.nextPageRef}
          className={buttonClasses}
        >
          <HiOutlineChevronRight />
        </button>
        <button
          disabled={true}
          ref={props.lastPageRef}
          className={buttonClasses}
        >
          <HiOutlineChevronDoubleRight />
        </button>
      </div>
    </div>
  );
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
  // TODO: change the interface for specifying an error
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

  // Whether the table component is ready to be displayed
  const [isTableLoaded, setIsTableLoaded] = useState<boolean>(false);

  const onGridReady = () => {
    setIsTableLoaded(true);
  };

  // Refs for controlling the pagination panel
  const currentPageRef = useRef<HTMLSpanElement>(null);
  const totalPagesRef = useRef<HTMLSpanElement>(null);
  const previousPageRef = useRef<HTMLButtonElement>(null);
  const nextPageRef = useRef<HTMLButtonElement>(null);
  const firstPageRef = useRef<HTMLButtonElement>(null);
  const lastPageRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onNextPage = () => {
    const gridApi = gridRef.current?.api;
    gridApi?.paginationGoToNextPage();
  };

  const onPreviousPage = () => {
    const gridApi = gridRef.current?.api;
    gridApi?.paginationGoToPreviousPage();
  };

  const onFirstPage = () => {
    const gridApi = gridRef.current?.api;
    gridApi?.paginationGoToFirstPage();
  };

  const onLastPage = () => {
    const gridApi = gridRef.current?.api;
    gridApi?.paginationGoToLastPage();
  };

  const onPaginationChanged = useCallback(() => {
    const gridApi = gridRef.current?.api;
    // Make sure the table is loaded before updating the pagination component to avoid flickering
    if (isTableLoaded && gridApi) {
      const totalPages = gridApi.paginationGetTotalPages();
      totalPagesRef.current!.textContent = totalPages.toString();
      // Ensure visibility of the pagination panel only after some data is loaded
      containerRef.current!.style.visibility =
        totalPages === 0 ? "hidden" : "visible";

      // Pages are zero based, hence the +1
      const currentPage = gridApi.paginationGetCurrentPage() + 1;
      currentPageRef.current!.textContent = currentPage.toString();

      previousPageRef.current!.disabled = currentPage === 1;
      firstPageRef.current!.disabled = currentPage === 1;
      previousPageRef.current!.onclick = onPreviousPage;
      firstPageRef.current!.onclick = onFirstPage;

      nextPageRef.current!.disabled = currentPage === totalPages;
      lastPageRef.current!.disabled = currentPage === totalPages;
      nextPageRef.current!.onclick = onNextPage;
      lastPageRef.current!.onclick = onLastPage;
    }
  }, [isTableLoaded]);

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

  useEffect(() => {
    onPaginationChanged();
  }, [isTableLoaded, onPaginationChanged]);

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
          pagination={true}
          paginationAutoPageSize={true}
          suppressPaginationPanel={true}
          suppressRowClickSelection={true}
          loadingOverlayComponent={LoadingOverlay}
          noRowsOverlayComponent={NoRowsOverlayComponent}
          ref={gridRef}
          onGridReady={onGridReady}
          onPaginationChanged={onPaginationChanged}
          enableCellTextSelection={true}
          {...props}
        />
      </div>
      <SimplePaginationPanel
        currentPageRef={currentPageRef}
        totalPagesRef={totalPagesRef}
        nextPageRef={nextPageRef}
        previousPageRef={previousPageRef}
        containerRef={containerRef}
        firstPageRef={firstPageRef}
        lastPageRef={lastPageRef}
      />
    </div>
  );
}
