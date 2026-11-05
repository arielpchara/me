import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'prismjs/themes/prism-tomorrow.css';
import '@/styles/global.css';
import { initAnalytics } from '@/shared/lib/analytics';
import { App } from './App';

if (import.meta.env.PROD && window.location.hostname !== 'localhost') initAnalytics();

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Built pages arrive already rendered; the dev server sends an empty root.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
