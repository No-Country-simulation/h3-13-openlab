import React from 'react'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

const Cliente = () => {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Leer el email guardado en localStorage
        const token = localStorage.getItem("jwtToken");
        const decoded = jwt_decode(token);
        if (decoded.nombre) {
          setUserEmail(decoded.nombre);
        }
      }, []);

  return (
    <div>
      <h3>Bienvenido Cliente: {userEmail}</h3>
      <appkit-button balance/>
      <appkit-network-button />
      <appkit-account-button />
    </div>
  )
}

export default Cliente
