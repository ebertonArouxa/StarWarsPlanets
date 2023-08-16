import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetProvider from './context/planet-provider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <PlanetProvider>
      <App />
    </PlanetProvider>,
  );
