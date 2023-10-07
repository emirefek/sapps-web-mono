import { FileInput } from '@mantine/core';

export function ImageUpload() {
  return (
    <input accept="image/*" id="icon-button-file" type="file" capture="environment"/>
    // <FileInput
    //   placeholder="Input placeholder"
    //   accept='image/*'      
    // />
  );
}