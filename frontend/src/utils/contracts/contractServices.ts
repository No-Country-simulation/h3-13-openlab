import { ethers } from "ethers";
import { getOrderbook, getOrderbookFactory } from "./contracts";

// Orderbook Factory
export const addPair = async (
  token1: string,
  token2: string,
  userAddress: string
) => {
  const orderbookFactoryContract = await getOrderbookFactory();

  try {
    const receipt = await orderbookFactoryContract.methods
      .addPair(token1, token2)
      .send({ from: userAddress, gas: "3000000" });

    // Acceder a los logs del evento
    const event = receipt.events?.OrderbookCreated;
    const identifier = event?.returnValues.identifier;
    const orderbookAddress = event?.returnValues.orderbookAddress;

    return {
      identifier,
      orderbookAddress,
      receipt,
    };
  } catch (error) {
    console.error("Error adding pair:", error);
  }
};

export const loadOrderbook = async (pairIdentifier: string) => {
  try {
    const orderbookFactoryContract = await getOrderbookFactory();

    const orderbookAddress: string = await orderbookFactoryContract.methods
      .orderbooks(pairIdentifier)
      .call({ gas: "3000000" });

    const orderbookContract = await getOrderbook(orderbookAddress);

    return { orderbookContract, orderbookAddress };
  } catch (error) {
    console.error("Error loading Orderbook contract:", error);
  }
};

// Tokens
export const approveTokens = async (
  orderbookAddress: string,
  amount: number
) => {
  // Token1 instance
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const erc20ABI = [
    "function approve(address spender, uint256 amount) public returns (bool)",
  ];
  const token1Contract = new ethers.Contract("0x000...", erc20ABI, signer); // reemplazar por el address del token

  // Llama a approve
  try {
    const tx = await token1Contract.approve(orderbookAddress, amount);

    console.log("Aprobación exitosa:", tx);
  } catch (error) {
    console.error("Error al aprobar tokens:", error);
  }
};

// Orderbook
export const loadBuyOrders = async (
  orderbookAddress: string,
  userAddress: string
) => {
  try {
    const orderbookContract = await getOrderbook(orderbookAddress);

    const buyOrders: string = await orderbookContract.methods
      .buyOrders(userAddress)
      .call({ gas: "3000000" });

    console.log(buyOrders);

    return buyOrders;
  } catch (error) {
    console.error("Error loading Orderbook contract:", error);
  }
};

export const placeBuy = async (
  buyPrice: number,
  buyQuantity: number,
  orderbook: any,
  userAddress: string
) => {
  try {
    const receipt = await orderbook.methods
      .placeBuy(buyPrice, buyQuantity)
      .send({ from: userAddress, gas: "30000000" });

    // Acceder a los logs del evento
    const event = receipt.events?.BuyOrderPlaced;
    console.log("buyOrder receipt: ", receipt);
    console.log("buyOrder returns: ", event?.returnValues);

    alert("Buy order placed successfully!");
  } catch (error) {
    console.error("Error placing buy order:", error);
    alert("Failed to place buy order.");
  }
};
