import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Report from "../Pages/Report/Report";
import Dev from "../Pages/Dev/Dev";
import ImageUploadCamera from "../Components/Report/ImageUploadCamera";
import NearbyReports from "../Pages/Report/NearbyReports";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/report/picture",
    element: <ImageUploadCamera />,
  },
  {
    path: "/report/nearby",
    element: <NearbyReports />,
  },
  {
    path: "/dev",
    element: <Dev />,
  },
];

const router = createBrowserRouter(routes);

export default router;
