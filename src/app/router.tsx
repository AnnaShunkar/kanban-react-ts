import { AppRoutes } from "../utils/routes";
import { createHashRouter } from "react-router";
import {HomePage} from "../pages/HomePage";
import {WorkspacesPage} from "../pages/WorkspacesPage";
import {WorkspacePage} from "../pages/WorkspacePage";

export const router = createHashRouter([
  {
    path: AppRoutes.Home,
    element: <HomePage />,
  },
  {
    path: AppRoutes.Workspaces,
    element: <WorkspacesPage />,
  },
  {
    path: AppRoutes.WorkspaceId,
    element: <WorkspacePage />,
  },
]);
