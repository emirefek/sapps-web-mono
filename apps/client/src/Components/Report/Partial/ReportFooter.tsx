import { Group, Modal, UnstyledButton, Timeline, Text, List, ThemeIcon, Space} from '@mantine/core';
import { useNavigate } from 'react-router';
import firesvg from "../FIRE.svg";
import previousReportSvg from "../PreviousReport.svg";
import timelineSvg from "../Timeline.svg";
import { useDisclosure } from '@mantine/hooks';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots, IconCircleCheck  } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { trpc } from "../../../lib/trpc"


export default function ReportFooter() {
  const navigate = useNavigate();
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const {data} = trpc.report.all.useQuery();
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(1);

  function areCoordinatesWithinRadius(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): { isWithinRadius: boolean; distanceKm: number } {
    const earthRadiusKm = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = earthRadiusKm * c;
    
    return {
      isWithinRadius: distanceKm <= 100,
      distanceKm: distanceKm
    };
  }
  
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${month}-${day}-${year} ${hours}:${minutes}`;
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.warn("geolocation not supported");
    }
  }

  function showPosition(position: GeolocationPosition) {
    const coords = position.coords;
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
  }

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <>
    <Group style={{padding: "15px"}} 
    justify='flex-end' grow>
    <UnstyledButton style={{display: "flex", height: "50px", width: "50px", justifyContent: "center"}} onClick={()=> {open(); setActive(0);}} variant="default">
    <img style={{height: "50px", width: "50px"}} src={previousReportSvg}/> 
    </UnstyledButton>
    <UnstyledButton onClick={()=>{ navigate("/report/picture", {replace: true}) }} 
    style={{display: "flex", height: "50px", width: "50px", justifyContent: "center"}}
    >
    <img style={{height: "50px", width: "50px"}} src={firesvg}/>   
    </UnstyledButton>
    <UnstyledButton style={{display: "flex", height: "50px", width: "50px", justifyContent: "center"}} variant="default" onClick={()=>{open(); setActive(1);}}>
    <img style={{height: "50px", width: "50px"}} src={timelineSvg}/> 
    </UnstyledButton>
    </Group>      
      <Modal opened={opened} onClose={close} title={active === 1 ? "Timeline" : "Previous Reports Nearby"}>
      {active === 1 ? <Timeline active={1} bulletSize={24} lineWidth={2}>
      <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
        <Text c="dimmed" size="sm">You&apos;ve created new branch <Text variant="link" component="span" inherit>fix-notifications</Text> from master</Text>
        <Text size="xs" mt={4}>2 hours ago</Text>
      </Timeline.Item>

      <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
        <Text c="dimmed" size="sm">You&apos;ve pushed 23 commits to<Text variant="link" component="span" inherit>fix-notifications branch</Text></Text>
        <Text size="xs" mt={4}>52 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Pull request" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
        <Text c="dimmed" size="sm">You&apos;ve submitted a pull request<Text variant="link" component="span" inherit>Fix incorrect notification message (#187)</Text></Text>
        <Text size="xs" mt={4}>34 minutes ago</Text>
      </Timeline.Item>

      <Timeline.Item title="Code review" bullet={<IconMessageDots size={12} />}>
        <Text c="dimmed" size="sm"><Text variant="link" component="span" inherit>Robert Gluesticker</Text> left a code review on your pull request</Text>
        <Text size="xs" mt={4}>12 minutes ago</Text>
      </Timeline.Item>
    </Timeline> : <List
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck size="1rem" />
        </ThemeIcon>
      }
    >
        {data?.map(element => (
          (areCoordinatesWithinRadius(element.latitude, element.longitude, latitude, longitude)).isWithinRadius ?
          <div key={element.id}>
          <List.Item>
            <List listStyleType='disc'>
              <Text>{element.status}</Text>
              <List.Item>{formatDate(element.timestamp)}</List.Item>
              <List.Item>{parseFloat(areCoordinatesWithinRadius(element.latitude, element.longitude, latitude, longitude).distanceKm.toFixed(2)) + " km"}</List.Item>
            </List>
          </List.Item>
          <Space h="sm" />
          </div> : null
      ))}
      
    </List>}
      </Modal>
    </>
  );
}