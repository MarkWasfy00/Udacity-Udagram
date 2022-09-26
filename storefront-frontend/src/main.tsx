import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "./style/reset.scss";
import "./style/home.scss";
import "./style/form.scss";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
