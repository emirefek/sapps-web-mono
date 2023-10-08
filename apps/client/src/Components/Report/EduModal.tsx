import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

export function EduModal() {
  const [opened, { close }] = useDisclosure(false);

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Modal opened={opened} onClose={close} title="Educations">
        {/* Modal content */}
      </Modal>
    </div>
  );
}
