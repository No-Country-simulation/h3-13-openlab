import Web3 from "web3";
import {
  OrderbookFactory_ABI,
  OrderbookFactory_Address,
  Orderbook_ABI,
  Token1_ABI,
  Token1_Address,
  Token2_ABI,
  Token2_Address,
} from "./constants";

// Inicializar Web3 con el proveedor de MetaMask
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const getOrderbookFactory = async () => {
  // Crear instancias de contratos
  return new web3.eth.Contract(
    OrderbookFactory_ABI as any[],
    OrderbookFactory_Address
  );
};

export const getOrderbook = async (address: string) => {
  // Crear instancias de contratos
  return new web3.eth.Contract(Orderbook_ABI as any[], address);
};

export const getToken1 = async () => {
  // Crear instancias de contratos
  return new web3.eth.Contract(Token1_ABI as any[], Token1_Address);
};

export const getToken2 = async () => {
  // Crear instancias de contratos
  return new web3.eth.Contract(Token2_ABI as any[], Token2_Address);
};
