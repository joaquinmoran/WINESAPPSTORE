import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios'; // Asegúrate de importar axios
import App from "./App";

const RootComponent = () => {
  useEffect(() => {
    // Recuperar el token después de un refresh
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // Configura el token en el encabezado de autorización para las solicitudes al servidor
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root'));

root.render(<RootComponent />);