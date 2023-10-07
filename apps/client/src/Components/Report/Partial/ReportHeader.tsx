import {  UnstyledButton,  Text, Grid,  Space } from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons-react';
import { EduCollapse } from '../EduCollapse';

function ReportHeader () {
  return (
    <>
    <Grid>
      <Grid.Col span={8}>
        <Text style={{padding: "15px"}}>Ahmet Emre Akar</Text>
      </Grid.Col>
      <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <UnstyledButton><IconCurrentLocation size={14} /></UnstyledButton>
      </Grid.Col>
    </Grid>
    <Space h="xl" />
    <EduCollapse />
    
    </>
    
  );
}

export default ReportHeader;
