import { RouterProvider } from "react-router-dom";
import router from "./Routes/route";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import TrpcDeployer from "./context/TrpcDeployer";
import { LocationProvider } from "./context/LocationProvider";

const theme = createTheme({});

function App() {
  return (
    <LocationProvider>
      <TrpcDeployer>
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
        </MantineProvider>
      </TrpcDeployer>
    </LocationProvider>
    
  );
}

export default App;
