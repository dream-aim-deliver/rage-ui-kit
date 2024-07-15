import { Column, ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { BaseDataTable, fuzzyFilter, fuzzySort, } from './BaseDataTable';
import { SourceDataTableActionsDropdown } from '../dropdown/SourceDataTableActionsDropdown';
import { ArrowUpDown } from 'lucide-react';
import { Button as ShadcnButton } from '@/ui/button';
import { cn } from '@/utils/utils';
import React from 'react';
import { Checkbox } from '@/ui/checkbox';


const SourceDataSchema = z.object({
    id: z.number(),
    name: z.string(),
    relative_path: z.string(),
    type: z.string(),
    protocol: z.string(),
    status: z.string(),
});

export type SourceData = z.infer<typeof SourceDataSchema>;


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
        header: ({ column }) => { return sortableHeader("ID", column) },
    },
    {
        accessorKey: "name",
        header: ({ column }) => { return sortableHeader("Name", column) },
        sortingFn: fuzzySort,
    },
    {
        accessorKey: "relative_path",
        header: ({ column }) => { return sortableHeader("Relative Path", column) },
        cell: props => {
            const value = props.getValue()
            return <div className="whitespace-nowrap">{value as React.ReactNode}</div>
        },
        filterFn: fuzzyFilter,
        sortingFn: fuzzySort,
    },
    {
        accessorKey: "type",
        header: ({ column }) => { return sortableHeader("Type", column) }
    },
    {
        accessorKey: "protocol",
        header: "Protocol",
    },
    {
        accessorKey: "status",
        header: ({ column }) => { return sortableHeader("Status", column) }
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const sourceDatum = row.original

            return (
                <SourceDataTableActionsDropdown sourceDatum={sourceDatum} />
            )
        },
    },

]


export interface SourceDataTableProps {
    data: SourceData[]
}


export function SourceDataTable({ data, ...props }: SourceDataTableProps) {
    return (
        <BaseDataTable columns={columns} data={data} {...props} />
    )
}