import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "../pages/Landing";
import { AppLayout } from "../layout/AppLayout";
import Tracker from "../components/health-tracker/Tracker";
import SignIn from "../components/login/Sign-in";
import Profile from "../components/profile/Profile";
import Sign_Up from "../components/sign up/Sign_Up";
import ReportList from "../components/report-list/Report-List";
import AllReportList from "../components/report-list/AllReportList";
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
        path: "/allreport",
        element: <AllReportList />,
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
      // Use the updated AuthGuard with isDataAnalystRoute for health stats
      {
        path: "/health-stats",
        element: (
          <AuthGuard isDataAnalystRoute={true}>
            {/* Health Stats Page */}
            <div>Health Stats Page Content Here</div>
          </AuthGuard>
        ),
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
