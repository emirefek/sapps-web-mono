import ReportHeader from "../../Components/Report/Partial/ReportHeader";
import { Flex } from "@mantine/core";
import ReportFooter from "../../Components/Report/Partial/ReportFooter";
import { Loader } from "@googlemaps/js-api-loader";
import { useLocation } from "../../context/LocationProvider";

export default function Report() {
  const { latitude, longitude } = useLocation();

  console.log(latitude, longitude);
  

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
  });

  loader.importLibrary("core").then(async () => {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: latitude || 0, lng: longitude || 0 },
      zoom: 18,
    }); 

    new google.maps.Marker({
      position: { lat: latitude || 0, lng: longitude || 0 },
      map,
      title: "Current location",
    });
  });

  return (
    <Flex
      direction="column"
      justify="space-between"
      style={{
        height: "100vh",
      }}
    >
      <ReportHeader />
      <div id="map" style={{ flex: "1 1 0%", backgroundColor: "red" }}></div>
      <ReportFooter />
    </Flex>
  );
}
