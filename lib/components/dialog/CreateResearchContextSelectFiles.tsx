import { SelectableSourceDataAGGrid } from "../table";
import { SelectableSourceDataRow } from "../table/SelectableSourceDataAGGrid";

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
    <div>
      <div>
        <SelectableSourceDataAGGrid
          rowData={props.sourceDataList}
          isLoading={props.isLoading}
          handleConfirmSelection={props.handleConfirmSelection} 
          errorOverlayProps={props.errorOverlayProps}
        />
      </div>
      <button onClick={props.onNext}>Next</button>
      <button onClick={props.onPrevious}>Prev</button>
    </div>
  );
};
