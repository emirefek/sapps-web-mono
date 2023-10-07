import { Group, Button, Affix, Text, Transition, rem } from '@mantine/core';
import { useNavigate } from 'react-router';

export default function ReportFooter() {
  const navigate = useNavigate();
  return (
    <Group justify='flex-end' grow>
    <Button style={{height: "50px", width: "50px"}}  variant="default">Past Papers</Button>
    <Button onClick={()=>{ navigate("/report/picture", {replace: true}) }} style={{height: "50px", width: "50px", borderRadius: "50%"}} variant="default">FIRE</Button>
    <Button style={{height: "50px", width: "50px"}} variant="default">Timeline</Button>
    </Group>      
  );
}