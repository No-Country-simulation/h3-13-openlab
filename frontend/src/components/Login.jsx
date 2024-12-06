
import { useAuth0 } from "@auth0/auth0-react";
import "../css/Login.css";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Bienvenido</h1>
      <button onClick={() => loginWithRedirect()}>Iniciar sesión / Registrarse</button>
    </div>
  );
};

export default Login;