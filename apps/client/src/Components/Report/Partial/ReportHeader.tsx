import { Text, Paper, Flex, UnstyledButton } from "@mantine/core";
import EducationSvg from "../Education.svg";

function ReportHeader() {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Paper
        style={{
          flex: 1,
          borderRadius: "10px",
          margin: "5px",
          borderWidth: "2px",
          borderColor: "black",
        }}
        radius="xs"
        p="sm"
      >
        <Text>Alberto Setzer</Text>
      </Paper>
      <a
        target="_blank"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        href="https://appliedsciences.nasa.gov/what-we-do/wildfires"
      >
        <UnstyledButton
          style={{
            height: "50px",
            width: "50px",
            marginRight: "5px",
            alignSelf: "center",
          }}
        >
          <img src={EducationSvg} />
        </UnstyledButton>
      </a>
    </Flex>
  );
}

export default ReportHeader;
