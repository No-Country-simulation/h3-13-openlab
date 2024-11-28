import { createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import axios from 'axios';
import { useAppKitAccount } from '@reown/appkit/react';
const URL = import.meta.env.VITE_URL_DEL_BACKEND; 

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

interface CreateInitiativeResponse {
  id: string;
  nombre: string;
  idea: string;
  problema: string;
  oportunidad: string;
  solucion: string;
  monto_requerido: number;
  image: string;
}

interface CreateInitiativeRequestData {
  nombre: string;
  idea: string;
  problema: string;
  oportunidad: string;
  solucion: string;
  monto_requerido: number;
  image: string;
}

export const createInitiative = createAsyncThunk<CreateInitiativeResponse, CreateInitiativeRequestData>(
  'initiatives/createInitiative',
  async (requestData, { rejectWithValue }) => {
    
    const { user , token } = useSelector((state: RootState) => state.auth);
    const { address } = useAppKitAccount();

    const dataToSend = {
      ...requestData,
      clienteId: user?.id,
      token, 
      billetera: address,
    };

    try {
      const response = await axios.post(`${URL}/api/iniciativa/add`, dataToSend);
      return response.data;
    } catch (error) {
      return rejectWithValue(error || 'Error desconocido');
    }
  }
);

export const createMSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = createMSlice.actions;
export default createMSlice.reducer;
