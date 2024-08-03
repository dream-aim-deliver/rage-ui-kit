import {
  Column,
  ColumnDef,
  FilterFn,
  SortingFn,
  sortingFns,
} from "@tanstack/react-table";
import { z } from "zod";
import { BaseDataTable } from "./BaseDataTable";
import { SourceDataTableActionsDropdown } from "../dropdown/SourceDataTableActionsDropdown";
import { ArrowUpDown } from "lucide-react";
import { Button as ShadcnButton } from "@/ui/button";
import { cn } from "@/utils/utils";
import React from "react";
import { Checkbox } from "@/ui/checkbox";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";

const SourceDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  relative_path: z.string(),
  type: z.string(),
  protocol: z.string(),
  status: z.string(),
});

export type SourceData = z.infer<typeof SourceDataSchema>;

const fuzzyFilter: FilterFn<SourceData> = (row, columnId, value, addMeta) => {
  // 1. Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // 2. Store the itemRank info
  addMeta({
    itemRank,
  });

  // 3. Return if the item should be filtered in/out
  return itemRank.passed;
};

// Custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<SourceData> = (rowA, rowB, columnId) => {
  let dir = 0;

  // 1. Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId] && rowB.columnFiltersMeta[columnId]) {
    const itemRankA = rowA.columnFiltersMeta[columnId]?.itemRank;
    const itemRankB = rowB.columnFiltersMeta[columnId]?.itemRank;
    if (typeof itemRankA === "number" && typeof itemRankB === "number") {
      dir = compareItems(itemRankA, itemRankB);
    } else {
      if (itemRankA === undefined && itemRankB === undefined) {
        dir = 0; // Consider them equal if both are undefined
      } else if (itemRankA === undefined) {
        dir = -1; // Treat A as less than B
      } else if (itemRankB === undefined) {
        dir = 1; // Treat B as less than A
      }
    }
  }

  // 2. Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const sortableHeader = (header: string, column: Column<SourceData>) => {
  return (
    <ShadcnButton
      variant="ghost"
      /* no padding */
      className={cn("p-1")}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {header}
      <ArrowUpDown className={cn("ml-2 h-4 w-4")} />
    </ShadcnButton>
  );
};

const columns: ColumnDef<SourceData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return sortableHeader("ID", column);
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return sortableHeader("Name", column);
    },
    sortingFn: fuzzySort,
  },
  {
    accessorKey: "relative_path",
    header: ({ column }) => {
      return sortableHeader("Relative Path", column);
    },
    cell: (props) => {
      const value = props.getValue();
      return (
        <div className="whitespace-nowrap">{value as React.ReactNode}</div>
      );
    },
    filterFn: fuzzyFilter,
    sortingFn: fuzzySort,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return sortableHeader("Type", column);
    },
  },
  {
    accessorKey: "protocol",
    header: "Protocol",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return sortableHeader("Status", column);
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const sourceDatum = row.original;

      return <SourceDataTableActionsDropdown sourceDatum={sourceDatum} />;
    },
  },
];

export interface SourceDataTableProps {
  data: SourceData[];
}

export function SourceDataTable({ data, ...props }: SourceDataTableProps) {
  return (
    <BaseDataTable
      columns={columns}
      data={data}
      fuzzyFilterFunction={fuzzyFilter}
      {...props}
    />
  );
}
