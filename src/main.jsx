import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './context/authContext.jsx';
import './styles/theme.css';


createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  //</StrictMode>,
)
