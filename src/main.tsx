import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { WorkspaceProvider } from './store/WorkspacesProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkspaceProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </WorkspaceProvider>
  </StrictMode>,
)
