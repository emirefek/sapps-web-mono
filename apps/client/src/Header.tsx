import { Flex, Button, Container } from '@mantine/core';
import HeaderButton from './HeaderButton';
export default function HeaderBasic() {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };
  return (
    <Container fluid {...demoProps} 
    >
      <HeaderButton />
    </Container>
  )
}