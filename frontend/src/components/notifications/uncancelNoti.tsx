import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchOrders, reactivateOrder } from '../../store/user/ordersUserSlice';
import { AppDispatch } from '../../store/store';

const UncancelNoti: React.FC<{ orderId: string, type: "Sells" | "Buys",  onClose: () => void }> = ({ orderId, type,  onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUncancel = () => {
              dispatch(reactivateOrder({ orderId, type }));
              toast.success("Order was reactivated successfully!", {
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
        <h2 className="text-xl font-semibold mb-4">Reactivate Order</h2>
        <p className="p-3">Are you sure you want to uncancel order?</p><br/>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleUncancel}
            className="bg-blue-500 text-white px-4 py-2 rounded"
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

export default UncancelNoti;
