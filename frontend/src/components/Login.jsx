import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import "../css/Login.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Validación simple
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/;
    if (!email.match(emailPattern)) {
      setError(
        "Formato de email inválido. Solo se permite gmail.com, hotmail.com, y outlook.com."
      );
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      // Realizar la solicitud de login tradicional con email y password
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      console.log("Login exitoso:", response.data);

      //Traemos el Token
      const token = response.data.jwtToken;

      // Guardamos el JWT en el localStorage
      localStorage.setItem("jwtToken", token);

      // Decodificar el token
      const decoded = jwt_decode(token);

      // Verificar el rol
      if (decoded.role === "CLIENTE") {
        navigate("/Cliente"); // Redirigir a Cliente si el rol es Cliente
      } else {
        console.log("Acceso permitido, pero no es Cliente.");
      }

      setError(null);
    } catch (error) {
      console.error("Error al logear:", error.response?.data || error.message);
      setError("Error al logear. Por favor, intenta nuevamente.");
    }
  };

  {
    /* Este Login es para un boton personalizado y trabaja con un objeto del usuario que se envia al Back*/
  }
  const handleGoogleLoginPersonalizado = async (response) => {
    try {
      if (!response) {
        setError("No se pudo obtener los datos");
        return;
      }

      console.log(response);
      // Construir el objeto con los datos recibidos
      const googleUserData = {
        sub: response.sub,
        name: response.name,
        given_name: response.given_name,
        family_name: response.family_name,
        picture: response.picture,
        email: response.email,
        email_verified: response.email_verified,
      };

      const res = await axios.post(
        "http://localhost:8080/api/login/googlePersonalizado",
        googleUserData
      );

      console.log("Login con Google exitoso:", res.data);

      const token = res.data.jwtToken;
      localStorage.setItem("jwtToken", token);

      // Decodificar el token
      const decoded = jwt_decode(token);
      console.log("Token decodificado:", decoded);

      // Verificar el rol
      if (decoded.role === "CLIENTE") {
        navigate("/Cliente"); // Redirigir a Cliente si el rol es Cliente
      } else {
        console.log("Acceso permitido, pero no es Cliente.");
      }

      setError(null);
    } catch (error) {
      console.error(
        "Error al logear con Google:",
        error.response?.data || error.message
      );
      setError("Error al logear con Google. Por favor, intenta nuevamente.");
    }
  };

  {
    /* Este es la funcion necesaria para que trabaje el boton personalizado*/
  }
  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${respose.access_token}` } }
        );
        handleGoogleLoginPersonalizado(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Login</button>
      </form>

      {/* Botón personalizado para Google Login */}
      <button onClick={login}>Continue with google</button>

    </div>
  );
};

export default Login;
