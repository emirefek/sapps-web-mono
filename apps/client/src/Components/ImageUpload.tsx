import React, { useState, ChangeEvent } from 'react';

// Define a TypeScript interface for the component's state
interface FileInputState {
  selectedFile: File | null;
  previewUrl: string | null;
}

const FileInputComponent: React.FC = () => {
  // Initialize the state with a null value for the selected file and preview URL
  const [state, setState] = useState<FileInputState>({
    selectedFile: null,
    previewUrl: null,
  });

  // Function to handle file input change event
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setState({ selectedFile, previewUrl: selectedFile ? URL.createObjectURL(selectedFile) : null });
  };

  return (
    <div>
      <h2>File Input Component</h2>
      <input
        type="file"
        accept=".pdf, .jpg, .png"
        onChange={handleFileChange}
      />
      {state.previewUrl && (
        <div>
          <p>Selected File: {state.selectedFile?.name}</p>
          <img
            src={state.previewUrl}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '200px' }} // Adjust the styling as needed
          />
          {/* You can do further processing with the selected file here */}
        </div>
      )}
    </div>
  );
};

export default FileInputComponent;
