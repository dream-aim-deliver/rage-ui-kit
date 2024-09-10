import { SelectableSourceDataAGGrid } from "../table";
import { SelectableSourceDataRow } from "../table/SelectableSourceDataAGGrid";
import { cn } from "@/utils/utils";

export interface CreateResearchContextSelectFilesViewProps {
  sourceDataList: SelectableSourceDataRow[];
  isLoading: boolean;
  handleConfirmSelection: (selectedRows: SelectableSourceDataRow[]) => void;
  onNext: () => void;
  onPrevious: () => void;
  errorOverlayProps?: {
    errorStatus: boolean;
    overlayText: string;
  };
}
export const CreateResearchContextSelectFilesView = (
  props: CreateResearchContextSelectFilesViewProps,
) => {
  return (
    <div className="p-5 space-y-1">
      <div>
        <SelectableSourceDataAGGrid
          rowData={props.sourceDataList}
          isLoading={props.isLoading}
          handleConfirmSelection={props.handleConfirmSelection}
          errorOverlayProps={props.errorOverlayProps}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={props.onPrevious}
          className={cn(
            "bg-neutral-200 hover:bg-neutral-400 text-black",
            "font-semibold py-2 px-4 rounded-lg shadow-md",
            "transition-colors duration-300",
          )}
        >
          Prev
        </button>

        <button
          onClick={props.onNext}
          className={cn(
            "bg-neutral-200 hover:bg-neutral-400 text-black",
            "font-semibold py-2 px-4 rounded-lg shadow-md",
            "transition-colors duration-300",
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
};
