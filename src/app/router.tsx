import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import WorkspacesPage from "../pages/WorkspacesPage";
import WorkspacePage from "../pages/WorkspacePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/workspaces",
    element: <WorkspacesPage />,
  },
  {
    path: "/workspaces/:workspaceId",
    element: <WorkspacePage />,
  },
]);
