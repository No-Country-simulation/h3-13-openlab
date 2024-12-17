import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  orderbooks: [Orderbook];
}

interface Orderbook {
  identifier: string;
  address: string;
  token1: {};
  token2: {};
}

// Estado inicial del usuario
const emptyUser: InitialState = {
  orderbooks: [
    {
      identifier: "",
      address: "",
      token1: {},
      token2: {},
    },
  ],
};

// Slice de autenticación
export const orderbookFactorySlice = createSlice({
  name: "orderbooks",
  initialState: localStorage.getItem("orderbooks")
    ? JSON.parse(localStorage.getItem("orderbooks") as any)
    : emptyUser,
  reducers: {
    setOrderbookData: (state, { payload }) => {
      state.orderbooks = [...state.orderbooks, payload];
      localStorage.setItem("orderbooks", JSON.stringify(state));
      return state;
    },
  },
});

export const { setOrderbookData } = orderbookFactorySlice.actions;

export default orderbookFactorySlice.reducer;

export const selectOrderbook = (state: any) =>
  state.orderbookFactory.orderbooks;
