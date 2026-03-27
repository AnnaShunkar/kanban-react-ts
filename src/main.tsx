import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from './app/App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { WorkspaceProvider } from './store/WorkspacesProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WorkspaceProvider>
          <App/>
        </WorkspaceProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
