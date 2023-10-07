import { RouterProvider } from "react-router-dom";
import router from "./Routes/route";
import { MantineProvider, createTheme } from "@mantine/core";
import TrpcProvider from "./context/TrpcProvider";
import '@mantine/core/styles.css';
const theme = createTheme({});

function App() {
  return (
    <TrpcProvider>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </TrpcProvider>
  );
}

export default App;
