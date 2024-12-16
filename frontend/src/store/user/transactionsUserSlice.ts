import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from './ordersUserSlice';
const URL = import.meta.env.VITE_URL_DEL_BACKEND;

export interface Transaction {
  id: string;
  createdAt: string;  
  order: Order;       
  state: boolean;     
}

export interface TransactionState {
  sells: Transaction[];  
  buys: Transaction[];   
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  sells: [],
  buys:[],
  loading: false,
  error: null,
};


// Acción para obtener todas las transacciones
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (id) => {
    try {
      const response = await axios.get(`${URL}/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.sells = action.payload.sells;
      state.buys = action.payload.buys;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.sells = action.payload.sells;
        state.buys = action.payload.buys;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  }
});

export const { setOrders } = transactionsSlice.actions;

export default transactionsSlice.reducer;
