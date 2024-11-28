import { Auth0Provider } from "@auth0/auth0-react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { defineChain, sepolia } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// 1. Define custom Ganache network
const ganacheNetwork = defineChain({
  id: 1337,
  caipNetworkId: "eip155:1337",
  chainNamespace: "eip155",
  name: "Ganache",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ganache Explorer",
      url: "http://127.0.0.1:8545",
    },
  },
});

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
  networks: [sepolia, ganacheNetwork],
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
