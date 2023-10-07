import { createBrowserRouter, RouteObject } from "react-router-dom"
import Home from "../Components/Home"
import Report  from "../Components/Report"
import ReportLayout from "../Layout/ReportLayout"

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: "/report",
    element: <Report/>,
  }
]

const router = createBrowserRouter(routes)

export default router