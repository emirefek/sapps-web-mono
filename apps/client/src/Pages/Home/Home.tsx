import React from 'react'
import HeaderBasic from '../../Header';
import { MantineProvider } from '@mantine/core';
import FAB from '../../Components/Home/ActionButton';

export default function Home() {
  return (
    <MantineProvider>
      <HeaderBasic/>
      <FAB />
    </MantineProvider>
  )
}
