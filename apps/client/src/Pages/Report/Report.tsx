import ReportHeader from "../../Components/Report/Partial/ReportHeader"
import { Flex } from "@mantine/core";
import ReportFooter from "../../Components/Report/Partial/ReportFooter";
import {useEffect} from "react";
import { Loader } from "@googlemaps/js-api-loader"

export default function Report() {
  useEffect(()=>{
    
     // Initialize and add the map
     let latitude = 0;
     let longitude = 0;
    
    function getLocation() {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
     } else {
       console.warn("geolocation not supported");
     }
    }
    
    function showPosition(position: GeolocationPosition) {
     const coords = position.coords;
     latitude = coords.latitude;
     longitude = coords.longitude;
    }
    
    getLocation();

    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      version: "weekly",
    });
    
    loader.importLibrary("core").then(async () => {
     const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
     const map = new Map(document.getElementById("map") as HTMLElement, {
       center: { lat: latitude, lng: longitude },
       zoom: 18,
     });
     new google.maps.Marker({
       position: { lat: latitude, lng: longitude },
       map,
       title: "Current location",
     });
    });
  }, [])

  return (
    <Flex direction="column" justify="space-between" style={{
      height: "100vh"
    }}>
      <ReportHeader />
      <div id="map" style={{flex: "1 1 0%", backgroundColor: "red"}}>
      </div>
      <ReportFooter />
    </Flex>
  );
}