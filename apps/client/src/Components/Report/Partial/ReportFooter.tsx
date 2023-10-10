import {
  Group,
  Modal,
  UnstyledButton,
  Timeline,
  Text,
  List,
  ThemeIcon,
  Space,
} from "@mantine/core";
import { useNavigate } from "react-router";
import firesvg from "../FIRE.svg";
import previousReportSvg from "../PreviousReport.svg";
import timelineSvg from "../Timeline.svg";
import { useDisclosure } from "@mantine/hooks";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useState } from "react";
import { useLocation } from "../../../context/LocationProvider";
import { useReports } from "../../../context/NearbyReportsProvider";

export default function ReportFooter() {
  const navigate = useNavigate();
  const { latitude, longitude } = useLocation();
  const reports = useReports();
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(1);

  function areCoordinatesWithinRadius(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): { isWithinRadius: boolean; distanceKm: number } {
    const earthRadiusKm = 6371; // Earth's radius in kilometers
    const lat1Rad = deg2rad(lat1);
    const lon1Rad = deg2rad(lon1);
    const lat2Rad = deg2rad(lat2);
    const lon2Rad = deg2rad(lon2);

    // Haversine formula
      const dLat = lat2Rad - lat1Rad;
      const dLon = lon2Rad - lon1Rad;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceKm = earthRadiusKm * c;
      
    return {
      isWithinRadius: distanceKm <= 100,
      distanceKm: distanceKm,
    };
  }

  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}-${day}-${year} ${hours}:${minutes}`;
  }

  return (
    <>
      <Group style={{ padding: "15px" }} justify="flex-end" grow>
        <UnstyledButton
          style={{
            display: "flex",
            height: "50px",
            width: "50px",
            justifyContent: "center",
          }}
          onClick={() => {
            open();
            setActive(0);
          }}
          variant="default"
        >
          <img
            style={{ height: "50px", width: "50px" }}
            src={previousReportSvg}
          />
        </UnstyledButton>
        <UnstyledButton
          onClick={() => {
            navigate("/report/picture", { replace: true });
          }}
          style={{
            display: "flex",
            height: "50px",
            width: "50px",
            justifyContent: "center",
          }}
        >
          <img style={{ height: "50px", width: "50px" }} src={firesvg} />
        </UnstyledButton>
        <UnstyledButton
          style={{
            display: "flex",
            height: "50px",
            width: "50px",
            justifyContent: "center",
          }}
          variant="default"
          onClick={() => {
            open();
            setActive(1);
          }}
        >
          <img style={{ height: "50px", width: "50px" }} src={timelineSvg} />
        </UnstyledButton>
      </Group>
      <Modal
        opened={opened}
        onClose={close}
        title={active === 1 ? "Timeline" : "Previous Reports Nearby"}
      >
        {active === 1 ? (
          <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item
              bullet={<IconGitBranch size={12} />}
              title="Report sent"
            ></Timeline.Item>

            <Timeline.Item
              bullet={<IconGitCommit size={12} />}
              title="Report verified"
            ></Timeline.Item>

            <Timeline.Item
              title="Authorities alerted"
              bullet={<IconGitPullRequest size={12} />}
              lineVariant="dashed"
            ></Timeline.Item>

            <Timeline.Item
              title="Operation ongoing"
              bullet={<IconMessageDots size={12} />}
            ></Timeline.Item>
          </Timeline>
        ) : (
          <List
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck size="1rem" />
              </ThemeIcon>
            }
          >
            {reports?.map((element) =>
              areCoordinatesWithinRadius(
                element.latitude,
                element.longitude,
                latitude,
                longitude
              ).isWithinRadius ? (
                <div key={element.id}>
                  <List.Item>
                    <List listStyleType="disc">
                      <Text>{element.status}</Text>
                      <List.Item>{formatDate(element.timestamp)}</List.Item>
                      <List.Item>
                        {parseFloat(
                          areCoordinatesWithinRadius(
                            element.latitude,
                            element.longitude,
                            latitude,
                            longitude
                          ).distanceKm.toFixed(2)
                        ) + " km"}
                      </List.Item>
                    </List>
                  </List.Item>
                  <Space h="sm" />
                </div>
              ) : null
            )}
          </List>
        )}
      </Modal>
    </>
  );
}
