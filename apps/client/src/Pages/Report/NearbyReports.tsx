import { useState, useEffect } from 'react'
import { Flex, Slider, Fieldset, TextInput, Button, Space, Table } from '@mantine/core'
import { trpc } from '../../lib/trpc'

export default function NearbyReports() {
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [radius, setRadius] = useState<number>(0);
  const {data} = trpc.report.all.useQuery();

  function areCoordinatesWithinRadius(
    lat: number,
    lon: number,
  ): boolean {
    const earthRadiusKm = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(Number(latitude) - lat);
    const dLon = deg2rad(Number(longitude) - lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat)) *
        Math.cos(deg2rad(Number(latitude))) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = earthRadiusKm * c;
    return (distanceKm <= radius) 
  }
  
  function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  
  const rows = data?.map((element) => (
    (areCoordinatesWithinRadius(element.latitude, element.longitude)) ? <Table.Tr key={element.id}>
    <Table.Td>{element.longitude}</Table.Td>
    <Table.Td>{element.latitude}</Table.Td>
    <Table.Td>{element.status}</Table.Td>
  </Table.Tr> : null
    
  ));

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
      justify={"flex-start"}
      direction={"column"}
    >
      <Flex
        align={"flex-start"}
        justify={"flex-start"}
      >
        <Fieldset legend="Location">
        <TextInput onChange={(event) => setLongitude(event.currentTarget.value)} value={longitude.toString()} label="Longitude" placeholder="Longitude" />
        <TextInput onChange={(event) => setLatitude(event.currentTarget.value)} value={latitude.toString()} label="Latitude" placeholder="Latitude" mt="md" />
        </Fieldset>
        <Fieldset legend="Nearby Fires">
          <Slider
            color="blue"
            value={radius}
            size="sm"
            onChange={(val) => setRadius(val)}
            marks={[
              { value: 20, label: '20km' },
              { value: 50, label: '50km' },
              { value: 80, label: '80km' },
            ]}
            style={{
              width: "200px"
            }}
          />
          <Space h="xl" />  
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            onClick={GetGeoLocation}
          >
            Find Nearby
          </Button>
        </Fieldset>
      </Flex>
      <Flex
        align={"center"}
        justify={"center"}
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Longitude</Table.Th>
              <Table.Th>Latitude</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Flex>
      
        
    </Flex>
  
  )
}
