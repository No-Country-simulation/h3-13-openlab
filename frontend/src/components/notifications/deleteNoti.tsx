import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteOrder, fetchOrders } from '../../store/user/ordersUserSlice';
import { AppDispatch } from '../../store/store';

const DeleteNoti: React.FC<{ orderId: string, type: "Sells" | "Buys", onClose: () => void }> = ({ orderId, type, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {

    dispatch(deleteOrder({ orderId, type }));
    toast.success("Order deleted successfully!", {
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
        <h2 className="text-xl font-semibold mb-4">Delete Order</h2>
        <p>Are you sure you want to delete order?</p><br />
        <p className="font-semibold italic text-center p-2">This action cannot be undone.</p>
        <div className="flex justify-between gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow border"
          >
            No, Cancel
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default DeleteNoti;
