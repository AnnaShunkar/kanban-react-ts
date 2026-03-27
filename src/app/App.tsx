import '../styles/main.css'
import { Routes, Route } from 'react-router'
import HomePage from '../pages/HomePage'
// import WorkspacesPage from '../pages/WorkspacesPage'
// import WorkspacePage from "../pages/WorkspacePage"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/workspaces" element={<WorkspacesPage />} />
      <Route path="/workspace" element={<WorkspacePage />} /> */}
    </Routes>
  )
}

