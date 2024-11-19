import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    // Validación simple
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (!email.match(emailPattern)) {
      setError("Formato de email inválido. Solo se permite gmail.com, hotmail.com, y outlook.com.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/cliente/add', {
        nombre,
        apellido,
        usuario: { email, password }
      });
      console.log("Cliente creado exitosamente:", response.data);
      setError(null);
    } catch (error) {
      console.error("Error al crear cliente:", error.response?.data || error.message);
      setError("Error al crear el cliente. Por favor, intenta nuevamente.");
    }
  };

  return (
    <form onSubmit={handleCreateAdmin}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>

      <div>
        <label>Apellido:</label>
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Crear</button>
    </form>
  );
};

export default Register;