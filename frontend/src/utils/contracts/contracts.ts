import Web3 from "web3";
import { AbiItem } from "web3-utils";
import {
  OrderbookFactory_ABI,
  OrderbookFactory_Address,
  Orderbook_ABI,
} from "./constants";

// Inicializar Web3 con el proveedor de MetaMask
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const getOrderbookFactory = async () => {
  // Crear instancias de contratos
  return new web3.eth.Contract(
    OrderbookFactory_ABI as AbiItem[],
    OrderbookFactory_Address
  );
};

export const getOrderbook = async (address: string) => {
  // Crear instancias de contratos
  return new web3.eth.Contract(Orderbook_ABI as AbiItem[], address);
};
