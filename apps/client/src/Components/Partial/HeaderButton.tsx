import { Group, Button } from '@mantine/core';
import {IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

export default function HeaderButton() {
  const navigate = useNavigate();
  return (
    <Group justify="flex-start">
      <Button onClick={()=>{navigate("/report")}} leftSection={<IconArrowLeft size={24} />} variant="default">
      </Button>
    </Group>
  );
}