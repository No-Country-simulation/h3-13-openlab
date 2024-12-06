import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { AppKitProvider } from "./components/AppKitProvider.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-7k3f6bwgzvjfn0og.us.auth0.com";
const clientId = "b6aZHP7vqBI6cAj00uOLvZMGkhn9U3uA";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "http://localhost:5173/Cliente",
        audience: "https://dev-7k3f6bwgzvjfn0og.us.auth0.com/api/v2/",
      }} >
      <AppKitProvider>
        <App />
      </AppKitProvider>
    </Auth0Provider>
  </StrictMode>
);
