import { useState } from "react";
import SendReportButton from "../../Components/Report/SendReportButton";
import ImageUploadCamera from "../../Components/Report/ImageUploadCamera";
import ReportHeader from "../../Components/Report/Partial/ReportHeader"
import { Flex } from "@mantine/core";
import ReportFooter from "../../Components/Report/Partial/ReportFooter";

export default function Report() {
  const [reportImage, setReportImage] = useState(null);
  const [reportDesc, setReportDesc] = useState("");
  const [reportLocation, setReportLocation] = useState({});

  return (
    <Flex direction="column" justify="space-between" style={{
      height: "100vh"
    }}>
      {/* <ImageUpload/> */}
      <ReportHeader />
      <div style={{flex: "1 1 0%", backgroundColor: "red"}}>
      </div>
      {/* <DescriptionInput setDesc={setReportDesc}/>
      <GetGeoLocation setLoc={setReportLocation}/> */}
      {/* <SendReportButton /> */}
      <ReportFooter />
    </Flex>
  );
}