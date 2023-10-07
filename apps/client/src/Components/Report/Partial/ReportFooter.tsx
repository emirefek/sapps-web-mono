import { Group, Button, UnstyledButton } from '@mantine/core';
import { useNavigate } from 'react-router';
import firesvg from "../FIRE.svg";

export default function ReportFooter() {
  const navigate = useNavigate();
  return (
    <Group style={{padding: "15px"}} 
    justify='flex-end' grow>
    <Button leftSection={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5"></path>
</svg>} style={{height: "50px", width: "50px"}}  variant="default">Past Papers</Button>
    <UnstyledButton onClick={()=>{ navigate("/report/picture", {replace: true}) }} 
    style={{display: "flex", height: "50px", width: "50px", justifyContent: "center"}}
    >
    <img style={{height: "50px", width: "50px"}} src={firesvg}/>   
    </UnstyledButton>
    <Button leftSection={<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-timeline-event" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 20m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
   <path d="M10 20h-6"></path>
   <path d="M14 20h6"></path>
   <path d="M12 15l-2 -2h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-3l-2 2z"></path>
</svg>} style={{height: "50px", width: "50px"}} variant="default">Timeline</Button>
    </Group>      
  );
}