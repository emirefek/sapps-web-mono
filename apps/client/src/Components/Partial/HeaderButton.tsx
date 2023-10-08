import { Group, UnstyledButton } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export default function HeaderButton() {
  const navigate = useNavigate();

  return (
    <Group justify="flex-start">
      <UnstyledButton
        onClick={() => {
          navigate("/report");
        }}
        variant="default"
      >
        <IconArrowLeft size={60} />
      </UnstyledButton>
    </Group>
  );
}
