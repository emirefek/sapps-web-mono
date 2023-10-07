import { createBrowserRouter, RouteObject } from "react-router-dom"
import Home from "../Pages/Home/Home"
import Report  from "../Pages/Report/Report"
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