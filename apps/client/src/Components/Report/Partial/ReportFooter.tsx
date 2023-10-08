import { Group, Modal, UnstyledButton, Timeline, Text, List, ThemeIcon, Space} from '@mantine/core';
import { useNavigate } from 'react-router';
import firesvg from "../FIRE.svg";
import previousReportSvg from "../PreviousReport.svg";
import timelineSvg from "../Timeline.svg";
import { useDisclosure } from '@mantine/hooks';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots, IconCircleCheck  } from '@tabler/icons-react';
import { useState } from 'react';
export default function ReportFooter() {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(1);

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
      <Modal opened={opened} onClose={close} title={active === 1 ? "Timeline" : "Your Previous Reports"}>
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
      {/* <List.Item
        icon={
          <ThemeIcon color="red" size={24} radius="xl">
            <IconCircleDashed size="1rem" />
          </ThemeIcon>
        }
      >
        <List listStyleType="disc">
        <Text>Ongoing</Text>
        <List.Item>09-08-2023 | 1.42 PM</List.Item>

        </List>
      </List.Item>
      <Space h="sm" /> */}
      <List.Item>
        <List listStyleType="disc">
          <Text>Completed</Text>
          <List.Item>09-25-2023 | 3.41 PM</List.Item>
        </List>
      </List.Item>
      <Space h="sm" />
      <List.Item>
        <List listStyleType="disc">
          <Text>Completed</Text>
          <List.Item>09-21-2023 | 11.47 AM</List.Item>
        </List>
      </List.Item>
      <Space h="sm" />
      <List.Item>
        <List listStyleType="disc">
          <Text>Completed</Text>
          <List.Item>09-12-2023 | 1.45 PM</List.Item>
        </List>
      </List.Item>
    </List>}
      </Modal>
    </>
  );
}