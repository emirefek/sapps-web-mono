import React, { useState } from 'react';
import { Button } from '@mantine/core';

export default function GetGeoLocation() {
  const [location, setLocation] = useState({});
  
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: { coords: { latitude: any; longitude: any; }; }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation(prevState => ({ ...prevState, latitude: latitude, longitude: longitude }));
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <Button variant="filled" onClick={handleLocationClick}>Get My Location</Button>
  )
}
