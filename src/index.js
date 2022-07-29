import React from 'react';
import ReactDOM from 'react-dom/client';
import Teleprompter from './Teleprompter';

const container = ReactDOM.createRoot(document.getElementById('app-container'));
container.render(
  <React.StrictMode>
    <Teleprompter />
  </React.StrictMode>
);
