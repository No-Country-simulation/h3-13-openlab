import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderbookInstance,
  setUserAddress,
} from "../../store/contracts/contractsSlices";
import { RootState } from "../../store/store";
import { addPair, loadOrderbook } from "../../utils/contracts/contractServices";

const OrderBook = () => {
  const { userAddress } = useSelector((state: RootState) => state.contracts);
  const dispatch = useDispatch();
  /* const [buyPrice, setBuyPrice] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellQuantity, setSellQuantity] = useState(""); */
  const [token1, setToken1] = useState("");
  const [token2, setToken2] = useState("");

  const handleAddPair = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addPair(token1, token2, userAddress);
  };

  const handleOrderbook = async (identifier: string) => {
    const orderbook = await loadOrderbook(identifier);
    console.log(orderbook);

    dispatch(setOrderbookInstance(orderbook));
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

          dispatch(setUserAddress(accounts[0])); // Guardar en Redux
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
        <input
          type="text"
          placeholder="Pair Identifier"
          onChange={(e) => handleOrderbook(e.target.value)}
        />
      </div>

      {/* {orderbookInstance && (
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
            <button onClick={placeBuyOrder}>Place Buy Order</button>
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
            <button onClick={placeSellOrder}>Place Sell Order</button>
          </div>
        </>
      )} */}
    </div>
  );
};

export default OrderBook;
