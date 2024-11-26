import { Auth0Provider } from "@auth0/auth0-react"; 
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store"; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// 1. Get projectId
const projectId = import.meta.env.VITE_PROJECT_ID;

// 2. Create a metadata object - optional
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: import.meta.env.VITE_ORIGIN_URL, // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata: metadata,
  networks: [sepolia],
  projectId,
  features: {
    analytics: true, // Optional -
  },
});

export const App = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH_REDIRECT,
      }}
    >
      <Provider store={store}>
        <RouterProvider router={AppRouter} />
        <ToastContainer position="top-center"/>
      </Provider>
    </Auth0Provider>
  );
};
