import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const createMSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    openModal: (state) => {
      console.log("abroModal")
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = createMSlice.actions;
export default createMSlice.reducer;
