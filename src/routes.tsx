import { createBrowserRouter, RouterProvider , type RouteObject } from "react-router-dom";
import NFP from "./pages/notFoundPage";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import App from "./App";
import Grades from "./pages/Grades";
import Classes from "./pages/Classes";
import StudentTable from "./pages/StudentTable";
import TableContextProvider from "./TableContext";
import { AnnouncementPage } from "./pages/AnnouncementPage";

 const routes: RouteObject[] = [
  {
    path: "/",
    element: <App children={<Home/>} />,
  },
  {
    path: "/signIn",
    element: <App children={<LogIn/>} />,
  },
  {
    path: "/announcements",
    element: <App children={<AnnouncementPage />} />,
  },
  {
    path: "/grades",
    element: <App children={<Grades />} />,
  },
  {
    path: "/grades/:classNum",
    element: <App children={<Classes />} />,
  },
  {
    path: "/grades/:classNum/:classOrder",
    element: <App children={<TableContextProvider><StudentTable /></TableContextProvider>} />,
  },
  {
    path: "*",
    element: <App children={<NFP />} />,
  },
];

const router = createBrowserRouter(routes);

export default function AppRouter() {
    return <RouterProvider router={router} />
}
     