import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "../components";
import { Home, Dashboard, Edit, NewTask } from "../pages";
import Profile from "../pages/Profile";
import ProtectedRoutes from "./ProtectedRoutes";

export default function Routespath() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      //   errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/tasks",
          element: (
      
              <Dashboard />
          ),
        },
        {
          path: "/new-task",
          element: (
            <ProtectedRoutes>
              <NewTask />,
            </ProtectedRoutes>
          ),
        },
        {
          path: "tasks/edit/:taskId",
          element: <Edit />,
        },
        {
          path: "/account/:username",
          element: <Profile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
