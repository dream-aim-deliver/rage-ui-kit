import { RemoteFile } from "../models";

export interface CreateResearchContextSelectFilesViewProps {
  files: RemoteFile[];
  selectFile: (file: RemoteFile) => void;
  onNext: () => void;
  onPrevious: () => void;
}
export const CreateResearchContextSelectFilesView = (
  props: CreateResearchContextSelectFilesViewProps,
) => {
  return (
    <div>
      <p>Select files</p>
      <div>
        {props.files.map((file) => (
          <div key={file.id}>
            <input
              type="checkbox"
              id={file.name}
              name={file.name}
              value={file.name}
              onChange={(e) => {
                e.preventDefault();
                props.selectFile(file);
              }}
            />
            <label htmlFor={file.name}>{file.name}</label>
          </div>
        ))}
      </div>
      <button onClick={props.onNext}>Next</button>
      <button onClick={props.onPrevious}>Prev</button>
    </div>
  );
};
