import type { FC } from "react";
import "../styles/main.css";
import { router } from "./router";
import { RouterProvider } from "react-router";

export const App: FC = () => {
  return <RouterProvider router={router} />;
}
