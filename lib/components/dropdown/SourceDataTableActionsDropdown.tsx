import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenu as ShadcnDropdownMenu } from '@/ui/dropdown-menu';
import { Button as ShadcnButton } from '@/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { SourceData } from '../table/SourceDataTable';



export const SourceDataTableActionsDropdown = ({
    sourceDatum,
}: {
    sourceDatum: SourceData;
}) => {
    return (

        <ShadcnDropdownMenu>

            <DropdownMenuTrigger asChild>
                <ShadcnButton variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </ShadcnButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(sourceDatum.id.toString())}
                >
                    Copy source data ID
                </DropdownMenuItem>


                <DropdownMenuItem
                >Delete</DropdownMenuItem>

            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    );
};

