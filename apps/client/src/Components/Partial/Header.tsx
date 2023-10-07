import { Stack } from '@mantine/core';
import HeaderButton from './HeaderButton';

export default function HeaderBasic() {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };
  return (
    <Stack 
      h={300}
      bg="var(--mantine-color-blue-light)"
      align='stretch'
      justify='flex-start'
      style={{
        width: "100%"
      }}
    >
      <HeaderButton />
    </Stack>
  )
}