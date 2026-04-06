import { AppRoute } from "../utils/routes";
import { createHashRouter } from "react-router";
import {HomePage} from "../pages/HomePage";
import {WorkspacesPage} from "../pages/WorkspacesPage";
import {WorkspacePage} from "../pages/WorkspacePage";

export const router = createHashRouter([
  {
    path: AppRoute.HOME,
    element: <HomePage />,
  },
  {
    path: AppRoute.WORKSPACES,
    element: <WorkspacesPage />,
  },
  {
    path: AppRoute.WORKSPACE,
    element: <WorkspacePage />,
  },
]);
