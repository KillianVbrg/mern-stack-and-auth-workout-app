import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './contexts/WorkoutsContext';
import AuthContextProvider from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <WorkoutsContextProvider>
      <App/>
    </WorkoutsContextProvider>
  </AuthContextProvider>
);