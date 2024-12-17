import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_URL_DEL_BACKEND;

export interface Order {
  id: string;
  logoDao: string;
  tokenDao: string;
  quantity: number;
  price: number;
  address: string;
  state: boolean;
}

export interface OrderCreate {
  logoDao: string;
  tokenDao: string;
  quantity: number;
  price: number;
  address: string;
}

interface OrdersState {
  sells: Order[];
  buys: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  sells: [
    {
      id: "1",
      logoDao:
        "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      tokenDao: "UNIK",
      quantity: 100,
      price: 150.5,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      state: true,
    },
    {
      id: "2",
      logoDao:
        "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      tokenDao: "REBN",
      quantity: 50,
      price: 75.75,
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      state: true,
    },
    {
      id: "3",
      logoDao:
        "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      tokenDao: "FEVR",
      quantity: 100,
      price: 150.5,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      state: false,
    },
    {
      id: "4",
      logoDao:
        "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      tokenDao: "EMEL",
      quantity: 50,
      price: 75.75,
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      state: true,
    },
  ],
  buys: [
    {
      id: "1",
      logoDao:
        "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      tokenDao: "SWIN",
      quantity: 200,
      price: 120.25,
      address: "0x7890abcdef1234567890abcdef1234567890abcd",
      state: true,
    },
    {
      id: "2",
      logoDao:
        "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      tokenDao: "DIMO",
      quantity: 300,
      price: 99.99,
      address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      state: true,
    },
    {
      id: "3",
      logoDao:
        "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      tokenDao: "TIKM",
      quantity: 300,
      price: 99.99,
      address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
      state: false,
    },
  ],
  loading: false,
  error: null,
};

// 1. Acción para desactivar una orden
export const desactivateOrder = createAsyncThunk(
  "ordersBooks/deactivateOrder",
  async ({ orderId, type }: { orderId: string; type: "Sells" | "Buys" }) => {
    const response = await axios.put(`${URL}/${orderId}/deactivate`, { type });
    return { response, orderId, type, state: false };
  }
);

// 2. Acción para reactivar una orden
export const reactivateOrder = createAsyncThunk(
  "ordersBooks/reactivateOrder",
  async ({ orderId, type }: { orderId: string; type: "Sells" | "Buys" }) => {
    const response = await axios.put(`${URL}/${orderId}/reactivate`, { type });
    return { response, orderId, type, state: true };
  }
);

// 3. Acción para eliminar una orden
export const deleteOrder = createAsyncThunk(
  "ordersBooks/deleteOrder",
  async ({ orderId, type }: { orderId: string; type: "Sells" | "Buys" }) => {
    const response = await axios.delete(`${URL}/${orderId}`);
    return { response, orderId, type };
  }
);

// 4. Acción para crear una nueva orden
export const createOrder = createAsyncThunk(
  "ordersBooks/createOrder",
  async ({
    orderData,
    type,
  }: {
    orderData: OrderCreate;
    type: "Sells" | "Buys";
  }) => {
    const response = await axios.post(`${URL}/create`, { orderData, type });
    return { newOrder: response.data, type };
  }
);

// Acción para obtener todas las órdenes
export const fetchOrders = createAsyncThunk(
  "ordersBooks/fetchOrders",
  async () => {
    const response = await axios.get(URL);
    return response.data;
  }
);

// Acción para actualizar una orden
export const updateOrder = createAsyncThunk(
  "ordersBooks/updateOrder",
  async ({
    orderId,
    orderData,
    type,
  }: {
    orderId: string;
    orderData: OrderCreate;
    type: "Sells" | "Buys";
  }) => {
    const response = await axios.put(`${URL}/${orderId}`, {
      ...orderData,
      type,
    });
    const updatedOrder = response.data;
    return { orderId, type, updatedOrder };
  }
);

export const ordersBooksSlice = createSlice({
  name: "ordersBooks",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.sells = action.payload.sells;
      state.buys = action.payload.buys;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.sells = action.payload.sells;
        state.buys = action.payload.buys;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unknown error";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { newOrder, type } = action.payload;
        if (type === "Sells") {
          state.sells.push(newOrder);
        } else {
          state.buys.push(newOrder);
        }
      })
      .addCase(desactivateOrder.fulfilled, (state, action) => {
        const { orderId, type, state: newState } = action.payload;
        const list = type === "Sells" ? state.sells : state.buys;
        const index = list.findIndex((order) => order.id === orderId);
        if (index >= 0) {
          list[index].state = newState;
        }
      })
      .addCase(reactivateOrder.fulfilled, (state, action) => {
        const { orderId, type, state: newState } = action.payload;
        const list = type === "Sells" ? state.sells : state.buys;
        const index = list.findIndex((order) => order.id === orderId);
        if (index >= 0) {
          list[index].state = newState;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const { orderId, type } = action.payload;
        const list = type === "Sells" ? state.sells : state.buys;
        const index = list.findIndex((order) => order.id === orderId);
        if (index >= 0) {
          list.splice(index, 1);
        }
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const { orderId, type, updatedOrder } = action.payload;
        const list = type === "Sells" ? state.sells : state.buys;
        const index = list.findIndex((order) => order.id === orderId);

        if (index >= 0) {
          list[index] = updatedOrder;
        }
      });
  },
});

export const { setOrders } = ordersBooksSlice.actions;

export default ordersBooksSlice.reducer;
