import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely suppress benign Vite Dev Server HMR WebSocket connection warnings
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const msg = event.reason ? String(event.reason.message || event.reason) : '';
    if (msg.toLowerCase().includes('websocket') || msg.toLowerCase().includes('failed to connect')) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = event.message ? String(event.message) : '';
    if (msg.toLowerCase().includes('websocket') || msg.toLowerCase().includes('failed to connect')) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

