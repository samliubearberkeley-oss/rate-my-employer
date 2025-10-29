import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Clear any old JWT tokens from previous auth implementation
localStorage.removeItem('insforge_auth_token');
localStorage.removeItem('insforge_session');
// Clear all items that might contain old auth data
Object.keys(localStorage).forEach(key => {
  if (key.includes('insforge') || key.includes('auth') || key.includes('token')) {
    localStorage.removeItem(key);
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
