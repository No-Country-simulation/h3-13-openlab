import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderCreate, Order , updateOrder} from "../../store/user/ordersUserSlice"; 
import { AppDispatch } from "../../store/store";
import { close, sumIcon } from "../../assets";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditOrdersProps { 
  order: Order;  
  onClose: () => void;
  type:"Sells" | "Buys";
}

const EditOrders: React.FC<EditOrdersProps> = ({ order, onClose , type}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector ((state: any) => state.darkMode.isDarkMode);

  const [orderData, setOrderData] = useState<OrderCreate>({
    logoDao: order.logoDao,
    tokenDao: order.tokenDao,
    quantity: order.quantity,
    price: order.price,
    address: order.address,
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {

    if (orderData.quantity <= 0 || orderData.price <= 0) {
      toast.error("Quantity and price must be greater than 0!");
      return;
    }

    dispatch(updateOrder({orderId:order.id, orderData , type}));

    toast.success("Order updated successfully!");

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg border p-3 w-[30em]" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}>
        <button onClick={onClose} className="float-end">
          <img src={close} alt="close" />
        </button>
        <h2 className="text-2xl font-semibold mt-4 ml-5">Edit Order</h2>

        <h2 className="pt-4 pl-4 pr-4 text-center text-xl font-bold flex flex-row gap-3 justify-center"><img src={order.logoDao} className="w-6 h-6"/> {order.tokenDao}</h2>

        <div className="flex flex-col justify-between p-4">
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
              style={{ color: isDarkMode? "black" :""}}
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
              style={{ color: isDarkMode? "black" :""}}
            />
          </div>

          <div className="m-4 flex justify-center">
            <button
              type="button" 
              onClick={handleSubmit} 
              className="mt-4 p-3 w-[20em] m-auto flex items-center justify-center bg-color-5 text-white text-sm font-semibold rounded-lg"
            >
              <img src={sumIcon} className="w-4 h-4 mr-2" />
              Update Order
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditOrders;
