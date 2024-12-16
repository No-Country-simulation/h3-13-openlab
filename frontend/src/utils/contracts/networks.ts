import { defineChain } from "@reown/appkit/networks";

// 1. Define custom Ganache network
export const ganacheNetwork = defineChain({
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

// 1. Define custom Hardhat network
export const hardhatNetwork = defineChain({
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
export const sepoliaNetwork = defineChain({
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
