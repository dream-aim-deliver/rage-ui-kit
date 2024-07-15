"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  FilterFn,
} from "@tanstack/react-table";

import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu as ShadcnDropdownMenu,
} from "@/ui/dropdown-menu";
import { Button as ShadcnButton } from "@/ui/button";

import { Button } from "@/components/button/Button";
import { cn } from "@/utils/utils";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import { useState } from "react";
import React from "react";
import { Input } from "@/components/ui/input";
import { RankingInfo } from "@tanstack/match-sorter-utils";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export interface BaseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fuzzyFilterFunction: FilterFn<TData>;
}

export function BaseDataTable<TData, TValue>({
  columns,
  data,
  fuzzyFilterFunction,
  ...props
}: BaseDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});

  const fuzzyFilter = fuzzyFilterFunction;

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
  });

  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [10, 25, 50, 100];
  const safePageIndex = table.getState()?.pagination?.pageIndex ?? 0;
  const nextPageIndex = safePageIndex + 1;

  return (
    <div className={cn("flex flex-col gap-y-4")}>
      <div>
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className={cn("p-2 font-lg shadow border border-block")}
        />
      </div>

      <div className={cn("rounded-md border")}>
        <ShadcnTable {...props}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadcnTable>
      </div>

      <div
        className={cn(
          "flex flex-col md:flex-row justify-between items-center gap-y-2 md:space-y-0 md:space-x-4",
        )}
      >
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2",
          )}
        >
          <ShadcnDropdownMenu>
            <span className={cn("whitespace-nowrap")}>
              Showing&nbsp;
              <DropdownMenuTrigger asChild>
                <ShadcnButton
                  variant="outline"
                  className={cn("min-w-min px-2 py-1 dark:text-slate-50")}
                >
                  {pageSize}
                </ShadcnButton>
              </DropdownMenuTrigger>
              &nbsp;rows
            </span>
            <DropdownMenuContent align="end">
              {pageSizes.map((size) => (
                <DropdownMenuItem
                  onClick={() => {
                    table.setPageSize(size);
                    setPageSize(size);
                  }}
                >
                  {size}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </ShadcnDropdownMenu>
        </div>

        <div className={cn("flex items-center gap-2")}>
          <Button
            variant="outline"
            size="sm"
            label={<ChevronFirst />}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn("dark:text-slate-50")}
          />
          <Button
            variant="outline"
            size="sm"
            label={<ArrowBigLeft />}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={cn("dark:text-slate-50")}
          />
          <span>
            Page {nextPageIndex} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            label={<ArrowBigRight />}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={cn("dark:text-slate-50")}
          />
          <Button
            variant="outline"
            size="sm"
            label={<ChevronLast />}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className={cn("dark:text-slate-50")}
          />
        </div>
      </div>
    </div>
  );
}
