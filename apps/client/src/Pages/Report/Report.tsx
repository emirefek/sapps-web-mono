import { useState } from "react";
import DescriptionInput from "../../Components/Report/DescriptionInput";
import GetGeoLocation from "../../Components/Report/GetGeoLocation";
import SendReportButton from "../../Components/Report/SendReportButton";
import ImageUpload from "../../Components/Report/ImageUpload";
import ImageUploadCamera from "../../Components/Report/ImageUploadCamera";

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