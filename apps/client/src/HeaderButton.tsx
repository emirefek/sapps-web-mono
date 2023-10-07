import { Group, Button } from '@mantine/core';
import { IconPhoto, IconDownload, IconArrowLeft } from '@tabler/icons-react';

export default function HeaderButton() {
  return (
    <Group justify="center">
      <Button leftSection={<IconArrowLeft size={24} />} variant="default">
      </Button>
    </Group>
  );
}