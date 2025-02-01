import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import { AppRouter } from './routes/AppRouter.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider>
    <AppRouter />
    </PrimeReactProvider>
  </StrictMode>,
)
