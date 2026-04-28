import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AppProvider } from './context/AppContext';
import '../styles/fonts.css';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
