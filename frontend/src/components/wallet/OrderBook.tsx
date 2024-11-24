import { useEffect, useState } from "react";
import Web3 from "web3";
import ABI_DEL_CONTRATO from "../../utils/contracts/OrderBookABI.json";

const OrderBook = () => {
  const [userAccount, setUserAccount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const price = "1200";
      const quantity = "5";

      // Convertir los valores de precio y cantidad a la unidad mínima (Wei)
      const priceInWei = Web3.utils.toWei(price, "ether"); // Convierte el precio a Wei
      const quantityInWei = Web3.utils.toWei(quantity, "ether"); // Convierte la cantidad a Wei

      console.log("Precio en Wei:", priceInWei);
      console.log("Cantidad en Wei:", quantityInWei);

      // Proceder con la transacción si la validación es exitosa
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        ABI_DEL_CONTRATO,
        "0xA3B71e8ED0B215E8908330bE070d2b92ab8f9279"
      );

      const buyCount = await contract.methods
        .buyCount()
        .send({ from: userAccount });
      console.log(buyCount);

      // Enviar la transacción
      /* await contract.methods
        .placeBuy(priceInWei, quantityInWei)
        .send({
          from: userAccount,
          gas: "3000000", // Ajusta según sea necesario
        })
        .on("transactionHash", (hash) => {
          console.log("Hash de transacción:", hash);
        })
        .on("receipt", (receipt) => {
          console.log("Recibo de transacción:", receipt);
        })
        .on("error", (error) => {
          console.error("Error en la transacción:", error);
          alert("Error al procesar la orden.");
        });
 */
      alert("Orden de compra colocada con éxito");
    } catch (error) {
      console.error("Error al realizar la transacción:", error);
      alert("Error al procesar la orden.");
    }
  };

  useEffect(() => {
    // Si usamos Reown directamente guardamos el usuario
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setUserAccount(accounts[0]);
        }
        console.log(userAccount);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Bienvenido Cliente:</h3>
      <h3>Wallet: {userAccount}</h3>
      <form onSubmit={handleSubmit}>
        <button type="submit">Enviar Orden</button>
      </form>
    </div>
  );
};

export default OrderBook;
