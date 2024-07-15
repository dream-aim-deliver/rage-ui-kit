"use client"

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
  SortingFn,
  sortingFns,
} from "@tanstack/react-table"

import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenu as ShadcnDropdownMenu } from '@/ui/dropdown-menu';
import { Button as ShadcnButton } from '@/ui/button';

import {
  Button,
} from "@/components/button/Button"
import { cn } from "@/utils/utils"
import { ArrowBigLeft, ArrowBigRight, ChevronFirst, ChevronLast, } from "lucide-react"
import { useState } from "react";
import React from "react";
import { Input } from "@/components/ui/input";
import { compareItems, RankingInfo, rankItem } from "@tanstack/match-sorter-utils";


declare module '@tanstack/react-table' {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

// Custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {

  // 1. Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // 2. Store the itemRank info
  addMeta({
    itemRank,
  })

  // 3. Return if the item should be filtered in/out
  return itemRank.passed
}

// Custom fuzzy sort function that will sort by rank if the row has ranking information
export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // 1. Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // 2. Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}


export interface BaseDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterable?: boolean
}

export function BaseDataTable<TData, TValue>({
  columns,
  data,
  filterable = false,
  ...props
}: BaseDataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: 'fuzzy',
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
      rowSelection
    }
  })

  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [10, 25, 50, 100];
  const safePageIndex = table.getState()?.pagination?.pageIndex ?? 0;
  const nextPageIndex = safePageIndex + 1;

  return (

    <div className={cn("flex flex-col gap-y-4")}>

      <div>
        <Input
          placeholder="Search all columns..."
          value={globalFilter ?? ''}
          onChange={event => setGlobalFilter(event.target.value)}
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
                          header.getContext()
                        )}
                    </TableHead>
                  )
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </ShadcnTable>
      </div>

      <div className={cn("flex flex-col md:flex-row justify-between items-center gap-y-2 md:space-y-0 md:space-x-4")}>

        <div className={cn("flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2")}>
          <ShadcnDropdownMenu>
            <span className={cn("whitespace-nowrap")}>
              Showing&nbsp;<DropdownMenuTrigger asChild>
                <ShadcnButton
                  variant="outline"
                  className={cn("min-w-min px-2 py-1 dark:text-slate-50")}
                >{pageSize}</ShadcnButton>
              </DropdownMenuTrigger>&nbsp;rows
            </span>
            <DropdownMenuContent align="end" >
              {pageSizes.map((size) => (
                <DropdownMenuItem
                  onClick={() => { table.setPageSize(size); setPageSize(size) }}
                >{size}</DropdownMenuItem>
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
  )
}
