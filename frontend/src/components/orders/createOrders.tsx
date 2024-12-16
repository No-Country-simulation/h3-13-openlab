import { useAppKitAccount } from "@reown/appkit/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { close, sumIcon } from "../../assets";
import {
  useAddBuyOrderMutation,
  useAddSellOrderMutation,
  useGetIniciativasQuery,
} from "../../store/api/apiSlice";
import { selectCurrentUser } from "../../store/auth/authSlice";

const CreateOrders = () => {
  const MySwal = withReactContent(Swal);
  const { address } = useAppKitAccount();
  const { id } = useSelector(selectCurrentUser);
  const [addBuyOrder, { isSuccess, isError, error }] = useAddBuyOrderMutation();
  const [addSellOrder] = useAddSellOrderMutation();
  const { data } = useGetIniciativasQuery(id);

  const [type, setType] = useState<"Sells" | "Buys">("Buys");
  const [price, setPrice] = useState<any>(null);
  const [quantity, setQuantity] = useState<any>(null);
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null);

  const handleInitiativeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = data?.find(
      (initiative: any) => initiative.id == selectedId
    );

    setSelectedInitiative(selected);
  };

  const handleButtonClick = (button: "Sells" | "Buys") => {
    setType(button);
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setQuantity(value);
  };

  const handleSubmit = () => {
    const order = {
      logo: selectedInitiative.imagen,
      name: selectedInitiative.nombre,
      tokens: quantity,
      price,
    };

    if (type === "Buys") {
      addBuyOrder(order);
    } else {
      addSellOrder(order);
    }

    if (!quantity || !selectedInitiative) {
      toast.error("All fields are required!");
      return;
    }
  };

  useEffect(() => {
    if (type === "Buys") {
      setPrice(selectedInitiative?.buy_price);
    } else {
      setPrice(selectedInitiative?.sell_price);
    }
  }, [type, selectedInitiative]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Initiative successfully created!", {
        style: { backgroundColor: "#1e8736", color: "#fff" },
      });

      MySwal.close();
    } else if (isError) {
      toast.error(
        "There was an error creating the initiative. Please try again.",
        {
          style: { backgroundColor: "#991e2a", color: "#fff" },
        }
      );
      console.error("Error:", error);
    }
  }, [isSuccess, isError]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg border p-3 w-[30em]">
        <button className="float-end" onClick={() => MySwal.close()}>
          <img src={close} alt="close" />
        </button>
        <h2 className="mt-4 ml-5 text-2xl font-semibold">Create New Order</h2>

        <div className="flex flex-col justify-between p-4">
          <div className="flex flex-row gap-8 m-1 border-b border-gray-200">
            <label htmlFor="type" className="content-center font-semibold">
              Order Type:{" "}
            </label>
            <div className="flex flex-row gap-6">
              <button
                type="button"
                className={`text-sm font-semibold p-3 w-[116px]  ${
                  type === "Buys"
                    ? "text-color-1 shadow border border-color-1 rounded-lg"
                    : "text-black"
                }`}
                onClick={() => handleButtonClick("Buys")}
              >
                Buys
              </button>
              <button
                type="button"
                className={`text-sm font-semibold w-[116px] p-3 ${
                  type === "Sells"
                    ? "text-color-1 shadow border border-color-1 rounded-lg"
                    : "text-black"
                }`}
                onClick={() => handleButtonClick("Sells")}
              >
                Sells
              </button>
            </div>
          </div>

          <div className="flex flex-row gap-8 p-2 m-1 border-b border-gray-200">
            <label className="font-semibold">Name:</label>
            <select
              onChange={handleInitiativeSelect}
              className="border rounded-lg shadow w-[16em]"
            >
              <option value="">Select a Token</option>
              {data?.map((initiative: any) => (
                <option key={initiative.id} value={initiative.id}>
                  <img
                    src={initiative.imagen}
                    className="w-4 h-4"
                    alt={initiative.nombre}
                  />
                  {initiative.id} - {initiative.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row items-center justify-center gap-8 p-2 m-1 border-b border-gray-200">
            <label htmlFor="quantity" className="font-semibold">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded-lg shadow w-[5em] text-center"
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-8 p-2 m-1 border-b border-gray-200">
            <label htmlFor="price" className="font-semibold">
              Price
            </label>
            <p>{price}</p>
          </div>

          <div className="flex justify-center m-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-4 p-3 w-[20em] m-auto flex items-center justify-center bg-color-5 text-white text-sm font-semibold rounded-lg"
            >
              <img src={sumIcon} className="w-4 h-4 mr-2" />
              Create Order
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateOrders;
