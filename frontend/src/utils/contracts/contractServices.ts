import { getOrderbook, getOrderbookFactory, getToken1 } from "./contracts";

// Orderbook Factory
export const addPair = async (
  token1: string,
  token2: string,
  userAddress: string
) => {
  const orderbookFactoryContract = await getOrderbookFactory();
  console.log(orderbookFactoryContract);
  console.log(userAddress);

  try {
    const tx = await orderbookFactoryContract.methods
      .addPair(token1, token2)
      .send({ from: userAddress, gas: "3000000" });

    console.log(tx);
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
    console.log(orderbookAddress);

    const orderbookContract = await getOrderbook(orderbookAddress);
    //console.log(orderbookContract);

    return orderbookContract;
  } catch (error) {
    console.error("Error loading Orderbook contract:", error);
  }
};

// Tokens
export const approveTokens = async (
  account: string,
  orderbookAddress: string,
  amount: number
) => {
  // Token1 instance
  const token1Contract = await getToken1();

  // Llama a approve
  try {
    const allowance = await token1Contract.methods.allowance(
      account,
      orderbookAddress
    );
    console.log(allowance);

    const tx = await token1Contract.methods
      .approve(orderbookAddress, amount)
      .send({ from: account });

    console.log("Aprobación exitosa:", tx);
  } catch (error) {
    console.error("Error al aprobar tokens:", error);
  }
};

// Orderbook
/* const placeBuyOrder = async () => {
  if (!orderbook) return alert("Orderbook not loaded!");
  // Convertir los valores de precio y cantidad a la unidad mínima (Wei)
  //const priceInWei = web3.utils.toWei(buyPrice.toString(), "ether"); // Convierte el precio a Wei
  //const quantityInWei = web3.utils.toWei(buyQuantity.toString(), "ether"); // Convierte la cantidad a Wei

  try {
    await approveTokens(token1Address, orderbookAddress, buyQuantity);

    await orderbook.methods
      .placeBuy(buyPrice, buyQuantity)
      .send({ from: accounts[0], gas: 30000000 });
    alert("Buy order placed successfully!");
  } catch (error) {
    console.error("Error placing buy order:", error);
    alert("Failed to place buy order.");
  }
}; */

/* const placeSellOrder = async () => {
  if (!orderbook) return alert("Orderbook not loaded!");
  try {
    await orderbook.methods
      .placeSell(sellPrice, sellQuantity)
      .send({ from: accounts[0] });
    alert("Sell order placed successfully!");
  } catch (error) {
    console.error("Error placing sell order:", error);
    alert("Failed to place sell order.");
  }
}; */
