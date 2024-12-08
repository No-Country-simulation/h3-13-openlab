import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { OrderCreate } from "../../store/user/ordersUserSlice";
import {  RootState } from "../../store/store";
import { useAppKitAccount } from "@reown/appkit/react";
import { close, sumIcon } from "../../assets";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateNoti from "../notifications/createNoti";

interface CreateOrdersProps {
  onClose: () => void;
}

const CreateOrders: React.FC<CreateOrdersProps> = ({ onClose }) => {
  const { address } = useAppKitAccount();

  const { initiatives } = useSelector((state: RootState) => state.initiatives);

  const [orderData, setOrderData] = useState<OrderCreate>({
    logoDao: "",
    tokenDao: "",
    quantity: 0,
    price: 0,
    address: address || ""
  });

  const [type, setType] = useState<'Sells' | 'Buys'>('Buys');
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null);
  const [modalNoti, setModalNoti] = useState(false)
  

  const handleInitiativeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = initiatives.find((initiative) => initiative.id === selectedId);

    if (selected) {
      setSelectedInitiative(selected);

      setOrderData((prev) => ({
        ...prev,
        logoDao: selected.logo,
        tokenDao: selected.tokenDao,
        address: address || prev.address,
      }));
    }
  };

  const handleButtonClick = (button: 'Sells' | 'Buys') => {
    setType(button);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? parseFloat(value) : value,
    }));
  };


  const handleSubmit = () => {
    if (!orderData.quantity || !orderData.price || !selectedInitiative) {
      toast.error("All fields are required!");
      return;
    }

    setModalNoti(true)
    }

  return (
    <div className="fixed inset-0 bg-black flex flex-col bg-opacity-70 flex justify-center items-center z-50">
        {modalNoti === true ? <CreateNoti orderData={orderData} type={type} onClose={() => { setModalNoti(false); onClose(); }}/> :""}
      <div className="bg-white rounded-lg shadow-lg border p-3 w-[30em]">
        <button onClick={onClose} className="float-end">
          <img src={close} alt="close" />
        </button>
        <h2 className="text-2xl font-semibold mt-4 ml-5">Create New Order</h2>

        <div className="flex flex-col justify-between p-4">
          <div className="m-1 flex flex-row gap-8 border-b border-gray-200">
            <label htmlFor="type" className="content-center font-semibold">Order Type: </label>
            <div className="flex flex-row gap-6">
              <button
                type="button" 
                className={`text-sm font-semibold p-3 w-[116px]  ${
                  type === 'Buys' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
                }`}
                onClick={() => handleButtonClick('Buys')}>
                Buys
              </button>
              <button
                type="button" 
                className={`text-sm font-semibold w-[116px] p-3 ${
                  type === 'Sells' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
                }`}
                onClick={() => handleButtonClick('Sells')}>
                Sells
              </button>
            </div>
          </div>

          <div className="m-1 p-2 flex flex-row gap-8 border-b border-gray-200">
            <label className="font-semibold">Name:</label>
            <select onChange={handleInitiativeSelect} className="border rounded-lg shadow w-[16em]">
              <option value="">Select a Token</option>
              {initiatives?.map((initiative) => (
                <option key={initiative.id} value={initiative.id}>
                  <img src={initiative.logo} className="w-4 h-4" alt={initiative.name} />
                  {initiative.tokenDao} - {initiative.name}
                </option>
              ))}
            </select>
          </div>

          <div className="m-1 p-2 flex flex-row gap-8 border-b border-gray-200 justify-center items-center">
            <label htmlFor="quantity" className="font-semibold">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={orderData.quantity}
              onChange={handleInputChange}
              className="border rounded-lg shadow w-[5em] text-center"
            />
          </div>

          <div className="m-1 p-2 flex flex-row gap-8 border-b border-gray-200 justify-center items-center">
            <label htmlFor="price" className="font-semibold">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              min="1"
              step="0.01"
              value={orderData.price}
              onChange={handleInputChange}
              className="border rounded-lg shadow w-[5em] text-center"
            />
          </div>

          <div className="m-4 flex justify-center">
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
