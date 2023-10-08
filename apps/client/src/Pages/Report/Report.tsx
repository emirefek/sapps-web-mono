import ReportHeader from "../../Components/Report/Partial/ReportHeader";
import { Flex } from "@mantine/core";
import ReportFooter from "../../Components/Report/Partial/ReportFooter";
import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Report() {
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
  });

  function setPosition(position: GeolocationPosition) {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      console.warn("geolocation not supported");
    }
  }

  loader.importLibrary("core").then(async () => {
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    const map = new Map(document.getElementById("map") as HTMLElement, {
      center: location,
      zoom: 18,
    });

    new google.maps.Marker({
      position: location,
      map,
      title: "Current location",
    });
  });

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {}, []);

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
