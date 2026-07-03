import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminPage from './AdminPage.jsx'

// Hash-based routing (not a real path) so the admin page never touches
// server/Vercel routing — it's just a fragment the browser never sends out.
const ADMIN_HASH = '#admin-97121d2a'
const isAdmin = window.location.hash === ADMIN_HASH

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? <AdminPage /> : <App />}
  </StrictMode>,
)
