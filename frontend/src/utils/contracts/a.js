// user
orderbookFactory = {
  // un orderbook por cada par de tokens
  // identifier, token1, token2, address ---> orderbook
  orderbook1: {
    identifier: "0x0000", // identificador para buscarlo dentro del OrderbookFactory
    token1: "0x0000", // Token1: Representa la moneda o activo que quieres usar para comprar. (USDC)
    token2: "0x0000", // Token2: Representa la moneda o activo que quieres recibir. (ETH)
    address: "0x0000", // address del orderbook
    buyOrders: [
      //price, quantity, timestamp, address??? ---> buyOrders/sellOrders
      {
        transactionHash: "0x0000", //opcional
        price: 1200,
        quantity: 5,
        timestamp: "",
        name: "", // nombre del token
      },
    ],
    //price, quantity, timestamp, address???
    sellOrders: [{}, {}],
  },
};
