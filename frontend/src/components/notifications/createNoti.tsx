import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrder, fetchOrders, OrderCreate } from '../../store/user/ordersUserSlice';
import { AppDispatch } from '../../store/store';

const CreateNoti: React.FC<{orderData: OrderCreate, onClose: () => void , type: "Sells" | "Buys" }> = ({orderData, onClose , type}) => {
  const dispatch = useDispatch<AppDispatch>();


  const handleCreate = () => {
    dispatch(createOrder({ orderData, type }));
    toast.success('Order created successfully!', {
        autoClose: 3000, 
      });
      dispatch(fetchOrders())
      setTimeout(() => {
        onClose();
      }, 2000);
    
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p className="text-xl font-semibold">Do you want to create this order?</p><br/>
        <p className="text-center"><strong>{type} </strong>Order for <strong>{orderData.quantity} {orderData.tokenDao}</strong> to $<strong>{orderData.price}</strong></p>
        <br/>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleCreate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default CreateNoti;
