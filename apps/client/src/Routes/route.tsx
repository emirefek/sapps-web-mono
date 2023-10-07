import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Report from "../Pages/Report/Report";
import Dev from "../Pages/Dev/Dev";

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
    path: "/dev",
    element: <Dev />,
  },
];

const router = createBrowserRouter(routes);

export default router;
