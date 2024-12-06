import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { defineChain, mainnet, arbitrum } from "@reown/appkit/networks";

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

// 1. Definir la red Sepolia
const sepoliaNetwork = defineChain({
  id: 11155111,
  caipNetworkId: "eip155:11155111",
  chainNamespace: "eip155",
  name: "Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "SepoliaETH",
    symbol: "SepoliaETH",
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID"], // Asegúrate de reemplazar con tu propio Project ID de Infura
      webSocket: ["wss://sepolia.infura.io/ws/v3/YOUR_INFURA_PROJECT_ID"], // Opcional
    },
  },
  blockExplorers: {
    default: {
      name: "Sepolia Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
});

// 2. Incluir otras redes (Mainnet, Arbitrum)
const networks = [mainnet, arbitrum, sepoliaNetwork, ganacheNetwork];

// 3. Obtener tu projectId desde https://cloud.reown.com
const projectId = "676cf45158d6e66c4827acaaebb33613";

// 4. Crear metadata (opcional)
const metadata = {
  name: "AppKit Example",
  description: "AppKit Example with Multiple Networks",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 5. Configurar el adaptador Ethers5 con múltiples redes (incluye Sepolia)
createAppKit({
  adapters: [new Ethers5Adapter()], // Usamos el adaptador Ethers5
  metadata: metadata,
  networks: networks, // Todas las redes (EVM, incluidas Sepolia, Mainnet, Arbitrum)
  projectId,
  features: {
    analytics: true, // Opcional - usa la configuración por defecto de tu configuración en la nube
  },
});

// 6. Crear el componente AppKitProvider
export function AppKitProvider({ children }) {
  return <div>{children}</div>;
}


///// Usar esto para implementar WAGMI Y no EtherV5 como arriba /////

// import { createAppKit } from '@reown/appkit/react'
// import { defineChain, mainnet, arbitrum} from '@reown/appkit/networks' // Importa Sepolia en lugar de Solana
// import { WagmiProvider } from 'wagmi'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// // 0. Setup queryClient
// const queryClient = new QueryClient()

// // 1. Define custom Ganache network
// const ganacheNetwork = defineChain({
//   id: 1337,
//   caipNetworkId: 'eip155:1337',
//   chainNamespace: 'eip155',
//   name: 'Ganache',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Ether',
//     symbol: 'ETH',
//   },
//   rpcUrls: {
//     default: {
//       http: ['http://127.0.0.1:8545'],
//       webSocket: ['ws://127.0.0.1:8545'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Ganache Explorer',
//       url: 'http://127.0.0.1:8545',
//     },
//   },
// })

// const sepoliaNetwork = defineChain({
//   id: 11155111,
//   caipNetworkId: 'eip155:11155111',
//   chainNamespace: 'eip155',
//   name: 'Sepolia',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'SepoliaETH',
//     symbol: 'SepoliaETH',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'], // Reemplaza con tu propio Project ID de Infura
//       webSocket: ['wss://sepolia.infura.io/ws/v3/YOUR_INFURA_PROJECT_ID'], // Opcional
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Sepolia Etherscan',
//       url: 'https://sepolia.etherscan.io',
//     },
//   },
// })

// // 2. Include other networks (Mainnet, Arbitrum)
// const networks = [mainnet, arbitrum, ganacheNetwork, sepoliaNetwork]

// // 3. Get projectId from https://cloud.reown.com
// const projectId = '676cf45158d6e66c4827acaaebb33613'

// // 4. Create metadata (optional)
// const metadata = {
//   name: 'AppKit Example',
//   description: 'AppKit Example with Multiple Networks',
//   url: 'https://reown.com/appkit',
//   icons: ['https://avatars.githubusercontent.com/u/179229932'],
// }

// // 5. Configure Wagmi Adapter with multiple networks (Incluye Sepolia)
// const wagmiAdapter = new WagmiAdapter({
//   networks: [mainnet, arbitrum, ganacheNetwork, sepoliaNetwork], // Agregar Sepolia a los adaptadores
//   projectId,
//   ssr: true,
// })

// // 6. Initialize AppKit with the Wagmi adapter
// createAppKit({
//   adapters: [wagmiAdapter], // Solo el adaptador Wagmi para las redes EVM
//   networks, // Todas las redes (EVM, incluidas Sepolia, Mainnet, Arbitrum, Ganache)
//   projectId,
//   metadata,
//   features: {
//     analytics: true,
//     logs: true,
//   },
// })

// // 7. Create AppKitProvider component
// export function AppKitProvider({ children }) {
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   )
// }
