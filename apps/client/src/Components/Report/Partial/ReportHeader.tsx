import {  UnstyledButton,  Text, Grid,  Space } from '@mantine/core';
import { IconCurrentLocation } from '@tabler/icons-react';
import { EduCollapse } from '../EduCollapse';

function ReportHeader () {
  return (
    <>
    <Grid>
      <Grid.Col span={8}>
        <Text style={{padding: "15px"}}>Fatih Terim</Text>
      </Grid.Col>
    </Grid>
    <Space h="xl" />
    <EduCollapse />
    
    </>
    
  );
}

export default ReportHeader;
