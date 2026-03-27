import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./context/AuthProvider";
import "./styles/main.css";
import { WorkspacesProvider } from "./store/WorkspacesProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <WorkspacesProvider>
        <App />
      </WorkspacesProvider>
    </AuthProvider>
  </React.StrictMode>
);
