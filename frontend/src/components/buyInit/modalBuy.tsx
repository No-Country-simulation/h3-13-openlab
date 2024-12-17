import { useState } from "react";
import { close } from "../../assets";
import useWindowSize from "../hooks/Responsive";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const ModalBuy = ({ initiative }: any) => {
  const [quantity, setQuantity] = useState(1);
  const MySwal = withReactContent(Swal);
  const { width } = useWindowSize();

  const isMobile = width <= 768;

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  function handleBuy() {
    alert("comprar"); // agregar contrato
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70">
      {!isMobile ? (
        <div className="bg-white rounded shadow-lg w-[964px] flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between p-6">
            <div className="flex flex-row items-center justify-center">
              <h1 className="mt-4 ml-5 text-3xl font-semibold">
                Buy Token DAO:
              </h1>
              <h1 className="mt-4 ml-5 text-3xl font-bold ">
                {initiative.nombre}
              </h1>
            </div>
            <button onClick={() => MySwal.close()} className="p-2">
              <img src={close} alt="close" />
            </button>
          </div>

          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col gap-3 m-auto w-[462px]">
              <div className="flex items-center justify-center">
                <img
                  src={initiative.imagen}
                  className="w-[200px]"
                  alt={initiative.nombre}
                />
              </div>
              <div>
                <h1 className="pl-4 m-2 text-sm font-bold">Idea</h1>
                <h1 className=" w-[400px] m-auto">{initiative.idea}</h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 m-auto w-[462px]">
              <div>
                <h1 className="m-2 text-sm font-bold">Problem</h1>
                <h1 className=" w-[400px] m-auto">{initiative.problema}</h1>
              </div>
              <div>
                <h1 className="m-2 text-sm font-bold">Solution</h1>
                <h1 className=" w-[400px] m-auto">{initiative.solucion}</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-evenly">
            <div>
              <h1 className="m-2 text-sm font-bold">Token:</h1>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantity}
                min="1"
                className="w-[70px] border shadow rounded-lg p-1"
              />
            </div>
            <div>
              <h1 className="m-2 text-sm font-bold">Price:</h1>
              <h1 className="p-1">${initiative.buy_price}</h1>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <h1 className="m-1 text-xl font-semibold">Total :</h1>
            <h1 className="text-2xl font-bold">
              ${initiative.buy_price * quantity}
            </h1>
          </div>

          <div className="flex flex-row items-center mt-5 mb-5 text-base font-semibold text-white justify-evenly">
            <button
              className="flex flex-row bg-[#3D7BFF] w-[404px] h-[45px] justify-center items-center rounded-lg hover:bg-[#00b2ff]"
              onClick={handleBuy}
            >
              Buy
            </button>
            <button
              className="flex flex-row bg-[#e0e0e0] text-black w-[304px] h-[45px] justify-center items-center rounded-lg hover:bg-black hover:text-white"
              onClick={() => MySwal.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded shadow-lg w-[90%] max-w-[400px] h-[auto] p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{initiative.nombre}</h1>
            <button onClick={() => MySwal.close()} className="text-xl">
              <img src={close} alt="close" />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center mt-4">
            <img
              src={initiative.imagen}
              className="w-[150px]"
              alt={initiative.nombre}
            />
            <h1 className="mt-4 text-sm font-bold">Idea</h1>
            <p className="w-[80%]">{initiative.idea}</p>
            <h1 className="mt-4 text-sm font-bold">Problem</h1>
            <p className="w-[80%]">{initiative.problema}</p>
            <h1 className="mt-4 text-sm font-bold">Solution</h1>
            <p className="w-[80%]">{initiative.solucion}</p>
          </div>

          <div className="flex flex-row items-center justify-evenly">
            <div>
              <h1 className="m-2 text-sm font-bold">Token:</h1>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantity}
                className="w-[70px] border shadow rounded-lg p-1"
              />
            </div>
            <div>
              <h1 className="m-2 text-sm font-bold">Price:</h1>
              <h1 className="p-1">${initiative.buy_price}</h1>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <h1 className="m-1 text-xl font-semibold">Total :</h1>
            <h1 className="text-2xl font-bold">
              ${initiative.buy_price * quantity}
            </h1>
          </div>

          <div className="flex justify-between mt-5">
            <button
              className="bg-[#3D7BFF] text-white w-[45%] p-3 rounded-lg hover:bg-[#00b2ff]"
              onClick={handleBuy}
            >
              Buy
            </button>
            <button
              className="bg-[#e0e0e0] text-black w-[45%] p-3 rounded-lg hover:bg-black hover:text-white"
              onClick={() => MySwal.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalBuy;
