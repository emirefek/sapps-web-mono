import React from 'react'
import { Grid, MantineProvider } from '@mantine/core';

export default function ReportLayout() {
  return (
    <MantineProvider>
    <Grid>
      <Grid.Col span={8}>1</Grid.Col>
      <Grid.Col span={8}>2</Grid.Col>
      <Grid.Col span={8}>3</Grid.Col>
    </Grid>
    </MantineProvider>

  )
}
