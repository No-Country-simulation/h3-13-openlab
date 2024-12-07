import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.tuservicio.com/orders';

interface Order {
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
  sells: [ {
    "logoDao": "https://example.com/logo1.png",
    "tokenDao": "DAO1",
    "quantity": 100,
    "price": 150.5,
    "address": "0x1234567890abcdef1234567890abcdef12345678"
  },
  {
    "logoDao": "https://example.com/logo2.png",
    "tokenDao": "DAO2",
    "quantity": 50,
    "price": 75.75,
    "address": "0xabcdef1234567890abcdef1234567890abcdef12"
  }],
  buys: [
    {
        "logoDao": "https://example.com/logo3.png",
        "tokenDao": "DAO3",
        "quantity": 200,
        "price": 120.25,
        "address": "0x7890abcdef1234567890abcdef1234567890abcd"
      },
      {
        "logoDao": "https://example.com/logo4.png",
        "tokenDao": "DAO4",
        "quantity": 300,
        "price": 99.99,
        "address": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef"
      }
  ],
  loading: false,
  error: null
};


export const fetchOrders = createAsyncThunk(
  'ordersBooks/fetchOrders',
  async () => {
    const response = await axios.get(API_URL);
    return response.data; 
  }
);


export const ordersBooksSlice = createSlice({
  name: 'ordersBooks',
  initialState,
  reducers: {
   
    setOrders: (state, action) => {
      state.sells = action.payload.sells;
      state.buys = action.payload.buys;
    }
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
        state.error = action.error.message || 'Unknown error';
      });
  }
});


export const { setOrders } = ordersBooksSlice.actions;


export default ordersBooksSlice.reducer;
