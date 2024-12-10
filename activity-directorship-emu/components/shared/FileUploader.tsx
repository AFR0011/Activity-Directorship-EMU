import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

type FileUploadProps = {
  imageUrl: string;
  onFieldChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      if (acceptedFiles.length > 0) {
        onFieldChange(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    [setFiles, onFieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div className="file-uploader">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </div>
      {imageUrl && (
        <div className="preview">
          <img src={imageUrl} alt="Preview" className="preview-image" />
          <button
            className="clear-button"
            onClick={() => {
              setFiles([]);
              onFieldChange("");
            }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;