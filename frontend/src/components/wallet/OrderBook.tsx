import { useEffect, useState } from "react";
import {
  addPair,
  approveTokens,
  loadBuyOrders,
  loadOrderbook,
  placeBuy,
} from "../../utils/contracts/contractServices";

const OrderBook = () => {
  const [buyPrice, setBuyPrice] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellQuantity, setSellQuantity] = useState("");
  const [identifier, setIdentifier] = useState<any>("");
  const [orderbook, setOrderbook] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<any>("");
  const [orderbookAddress, setOrderbookAddress] = useState<any>("");
  const [token1, setToken1] = useState("");
  const [token2, setToken2] = useState("");

  const handleAddPair = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newOrderbook = await addPair(token1, token2, userAddress);
    console.log(newOrderbook);
    setIdentifier(newOrderbook?.identifier);
  };

  const handleOrderbook = async () => {
    const orderbook = await loadOrderbook(identifier);
    console.log(orderbook?.orderbookAddress);

    setOrderbook(orderbook?.orderbookContract);
    setOrderbookAddress(orderbook?.orderbookAddress);
  };

  const handleBuyOrder = async () => {
    try {
      await approveTokens(orderbookAddress, parseInt(buyPrice));

      await placeBuy(
        parseInt(buyPrice),
        parseInt(buyQuantity),
        orderbook,
        userAddress
      );
    } catch (error) {
      console.error("Error placing buy order:", error);
      alert("Failed to place buy order.");
    }
  };

  useEffect(() => {
    // Si usamos Reown directamente guardamos el usuario
    const init = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          //console.log("Cuentas conectadas:", accounts[0]);

          setUserAddress(accounts[0]);
        } catch (error) {
          console.error("Error al solicitar las cuentas:", error);
        }
      } else {
        console.error("MetaMask no está instalado.");
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Orderbook DApp</h1>
      <form onSubmit={handleAddPair}>
        <p>{userAddress}</p>
        <input
          type="text"
          placeholder="Token 1"
          value={token1}
          onChange={(e) => setToken1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token 2"
          value={token2}
          onChange={(e) => setToken2(e.target.value)}
        />

        <button>Add Token Pair</button>
      </form>

      <div>
        <h2>Load Orderbook</h2>
        <button onClick={() => handleOrderbook}>Buscar Orderbook</button>
      </div>

      {orderbook && (
        <>
          <div>
            <h2>Place Buy Order</h2>
            <input
              type="number"
              placeholder="Price"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(e.target.value)}
            />
            <button onClick={handleBuyOrder}>Place Buy Order</button>
          </div>

          <div>
            <h2>Place Sell Order</h2>
            <input
              type="number"
              placeholder="Price"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={sellQuantity}
              onChange={(e) => setSellQuantity(e.target.value)}
            />
            {/* <button onClick={placeSellOrder}>Place Sell Order</button> */}
          </div>
          <button
            onClick={() => {
              loadBuyOrders(orderbookAddress, userAddress);
            }}
          >
            Buy Orders
          </button>
        </>
      )}
    </div>
  );
};

export default OrderBook;
