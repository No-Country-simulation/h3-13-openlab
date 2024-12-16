import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="p-2 bg-white rounded-lg text-color-3"
      disabled={isAuthenticated}
    >
      Iniciar sesión
    </button>
  );
};

export default LoginButton;
