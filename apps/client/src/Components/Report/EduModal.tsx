import { useDisclosure } from '@mantine/hooks';
import { Modal, UnstyledButton } from '@mantine/core';
import EducationSvg from "./Education.svg"

export function EduModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
      <Modal opened={opened} onClose={close} title="Educations">
        {/* Modal content */}
      </Modal>
      
    </div>
  );
}