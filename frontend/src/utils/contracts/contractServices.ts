import { getOrderbook, getOrderbookFactory, getToken } from "./contracts";

// Orderbook Factory
export const addPair = async (
  token1: string,
  token2: string,
  userAddress: string | undefined
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
  userAddress: string | undefined,
  orderbookAddress: string,
  tokenAddress: string,
  amount: number
) => {
  // Llama a approve
  try {
    // Token1 instance
    const token1Contract = await getToken(tokenAddress);
    const tx = await token1Contract.methods
      .approve(orderbookAddress, amount)
      .send({ from: userAddress, gas: "30000000", gasPrice: "200000" });

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
  orderbookAddress: string,
  userAddress: string | undefined
) => {
  try {
    const orderbookContract = await getOrderbook(orderbookAddress);

    const receipt = await orderbookContract.methods
      .placeBuy(buyPrice, buyQuantity)
      .send({ from: userAddress, gas: "300000000", gasPrice: "200000" });

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
