import { useState } from "react";
import DescriptionInput from "./DescriptionInput";
import GetGeoLocation from "./GetGeoLocation";
import SendReportButton from "./SendReportButton";
import ImageUpload from "./ImageUpload";
import ImageUploadCamera from "./ImageUploadCamera";

export default function Report() {
  const [reportImage, setReportImage] = useState(null);
  const [reportDesc, setReportDesc] = useState("");
  const [reportLocation, setReportLocation] = useState({});

  return (
    <div>
      {/* <ImageUpload/> */}
      <ImageUploadCamera />
      {/* <DescriptionInput setDesc={setReportDesc}/>
      <GetGeoLocation setLoc={setReportLocation}/> */}
      <SendReportButton />
    </div>
  );
}