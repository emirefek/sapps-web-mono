import { RouterProvider } from "react-router-dom";
import router from "./Routes/route";
import { MantineProvider, createTheme } from "@mantine/core";
const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
