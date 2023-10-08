import { useState, useEffect } from 'react'
import { Flex, Slider, Fieldset, TextInput, Button, Space } from '@mantine/core'

export default function NearbyReports() {
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");

  function GetGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: { coords: { latitude: number; longitude: number; }; }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatitude(latitude.toString());
    setLongitude(longitude.toString());
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <Flex
      align={"flex-start"}
      justify={"space-between"}
      >
      <Fieldset legend="Locations">
        <TextInput onChange={(event) => setLongitude(event.currentTarget.value)} value={longitude.toString()} label="Longitude" placeholder="Longitude" />
        <TextInput onChange={(event) => setLatitude(event.currentTarget.value)} value={latitude.toString()} label="Latitude" placeholder="Latitude" mt="md" />
        <Space h="md" />  
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          onClick={GetGeoLocation}
        >
          Get Location
        </Button>
      </Fieldset>
    </Flex>
  
  )
}
