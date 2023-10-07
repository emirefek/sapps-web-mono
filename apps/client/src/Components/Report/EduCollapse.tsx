import { Button, Group, Text, Collapse, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronsDown } from '@tabler/icons-react';

export function EduCollapse() {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <Box maw={400} mx="auto">
      <Group justify="center" mb={5}>
        <Button leftSection={<IconChevronsDown size={14} />}  onClick={toggle}>Education</Button>
      </Group>
      <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
        <Text>Aman hocam</Text>
      </Collapse>
    </Box>
  );
}