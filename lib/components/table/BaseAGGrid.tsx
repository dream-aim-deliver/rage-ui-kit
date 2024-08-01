import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useCallback, useMemo, useRef, useState } from "react";

export interface BaseAGGridProps<TRowData> {
    rowData: TRowData[];
    columnDefs: ColDef[];
}

export function BaseAGGrid<TRowData>({
    rowData,
    columnDefs,
}: BaseAGGridProps<TRowData>) {
    const [gridApi, setGridApi] = useState<GridApi<TRowData> | null>(null);

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
        if (gridApi) {
            gridApi.setFilterModel(null);
        }
    }

    // AG Grid Quick Filter set up:
    // to enable a fuzzy search bar
    const gridRef = useRef<AgGridReact>(null);

    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current!.api.setGridOption(
            "quickFilterText",
            (document.getElementById("ag-grid-filter-text-box") as HTMLInputElement)
                .value,
        );
    }, []);

    return (
        <div>
            <div className="example-wrapper">
                <div className="example-header">
                    <span>Fuzzy Search: </span>
                    <input
                        type="text"
                        id="ag-grid-filter-text-box"
                        placeholder="enter text to search..."
                        onInput={onFilterTextBoxChanged}
                    />
                </div>

                <div>
                    <button onClick={clearColumnFilters}>Clear Filters</button>
                </div>
            </div>

            <div
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
                    onGridReady={(event: GridReadyEvent<TRowData>) => {
                        setGridApi(event.api);
                    }}
                />
            </div>
        </div>
    );
}
