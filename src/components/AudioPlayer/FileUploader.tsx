import type { ChangeEvent } from "react";
import type { FileUploaderProps } from "../../types/FileUploaderProps";

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" accept="audio/*" onChange={handleChange} />
    </div>
  );
};
