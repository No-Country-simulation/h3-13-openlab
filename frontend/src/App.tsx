import { Auth0Provider } from "@auth0/auth0-react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { defineChain } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouter } from "./router/AppRouter";
import { store } from "./store/store";

// 1. Define custom Hardhat network
const hardhatNetwork = defineChain({
  id: 31337,
  caipNetworkId: "eip155:31337",
  chainNamespace: "eip155",
  name: "hardhat",
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
      name: "Hardhat Explorer",
      url: "http://127.0.0.1:8545",
    },
  },
});

// 1. Definir la red Sepolia
const sepoliaNetwork = defineChain({
  id: 11155111,
  caipNetworkId: "eip155:11155111",
  chainNamespace: "eip155",
  name: "Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "SepoliaETH",
    symbol: "SepoliaETH",
  },
  rpcUrls: {
    default: {
      http: [
        "https://eth-sepolia.g.alchemy.com/v2/pL77TKg5FWlzPukPXaJpGRtElEHspjzi",
      ], // Asegúrate de reemplazar con tu propio Project ID de Infura
      webSocket: [
        "wss://eth-sepolia.g.alchemy.com/v2/pL77TKg5FWlzPukPXaJpGRtElEHspjzi",
      ], // Opcional
    },
  },
  blockExplorers: {
    default: {
      name: "Sepolia Etherscan",
      url: "https://sepolia.etherscan.io",
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
  networks: [sepoliaNetwork, hardhatNetwork],
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
        <ToastContainer position="top-center" />
      </Provider>
    </Auth0Provider>
  );
};
