import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAddress: "",
  orderbookAddress: "",
  orderbookInstance: null,
};

const contractsSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
    setOrderbookAddress: (state, action) => {
      state.orderbookAddress = action.payload;
    },
    setOrderbookInstance: (state, action) => {
      state.orderbookInstance = action.payload;
    },
    resetState: () => initialState, // Resetear todo el estado
  },
});

export const {
  setUserAddress,
  setOrderbookAddress,
  setOrderbookInstance,
  resetState,
} = contractsSlice.actions;

export default contractsSlice.reducer;
