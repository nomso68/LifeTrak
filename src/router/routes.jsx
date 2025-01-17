import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Landing from "../pages/Landing";
import { AppLayout } from "../layout/AppLayout";
import Tracker from "../components/health-tracker/Tracker";
import SignIn from "../components/login/Sign-in";
import Profile from "../components/profile/Profile";
import Sign_Up from "../components/sign up/Sign_Up";
import ReportList from "../components/report-list/Report-List";
import AuthGuard from "./AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/tracker",
        element: (
          <AuthGuard>
            <Tracker />
          </AuthGuard>
        ),
      },
      {
        path: "/report",
        element: <ReportList />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "register",
        element: <Sign_Up />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
