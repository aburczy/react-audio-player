import type { ChangeEvent } from "react";
import type { FileUploaderProps } from "../../types/FileUploaderProps";

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="file-uploader">
      <label className="file-label">Fichier audio</label>
      <input
        type="file"
        accept="audio/*"
        onChange={handleChange}
        className="file-input"
      />
    </div>
  );
};
