import { RouterProvider } from "react-router-dom";
import router from "./Routes/route";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import TrpcDeployer from "./context/TrpcDeployer";
import { LocationProvider } from "./context/LocationProvider";
import { NearbyReportsProvider } from "./context/NearbyReportsProvider";

const theme = createTheme({});

function App() {
  return (
      <LocationProvider>
        <TrpcDeployer>
          <NearbyReportsProvider>
          <MantineProvider theme={theme}>
            <RouterProvider router={router} />
          </MantineProvider>
          </NearbyReportsProvider>
        </TrpcDeployer>
      </LocationProvider>
  );
}

export default App;
