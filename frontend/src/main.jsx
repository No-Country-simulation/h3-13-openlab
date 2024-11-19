import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppKitProvider } from "./components/AppKitProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="6713596081-fudciddd7e75poe1qijurssr958e1n4q.apps.googleusercontent.com">
      <AppKitProvider>
        <App />
      </AppKitProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
