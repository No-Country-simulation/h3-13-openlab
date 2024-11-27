// store.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = import.meta.env.VITE_URL_DEL_BACKEND;

interface Initiative {
  id: string;
  name: string;
  priceFluctuation: number[];
  colaborator: number;
  tokens: string;
  missions: string;
  likes: number;
  shares: string;
  createdAt: string;
  img: string;
  idea: string;
  problem: string;
  solution: string;
  buy_price: number;
  sell_price: number;
}

interface InitiativesState {
  initiatives: Initiative[];
  loading: boolean;
  error: string | null;
  filter: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: InitiativesState = {
  initiatives: [],
  loading: false,
  error: null,
  filter: '',
  sortOrder: 'asc',
};

interface BackendInitiative {
  id: string;
  nombre: string;
  idea: string;
  problema: string;
  oportunidad: string;
  solucion: string;
  monto_requerido: number;
  buy_price: number;
  sell_price: number;
  misiones_actuales: number;
  misiones_objetivo: number;
  colaboradores: number;
  likes: number;
  shares: number;
}


export const fetchInitiatives = createAsyncThunk(
  'initiatives/fetchInitiatives',
  async () => {
    try {
      const response = await axios.get(`${URL}/api/iniciativa/getAll`);
      
      // Mapeo de los datos con el tipo adecuado
      const mappedInitiatives = response.data.dataIterable.map((item: BackendInitiative) => ({
        id: item.id,
        name: item.nombre,
        priceFluctuation: [100,300,200,400,500],
        colaborator: item.colaboradores,
        tokens: 400,
        missions: `${item.misiones_actuales}/${item.misiones_objetivo}`,
        likes: item.likes,
        shares: item.shares,
        createdAt: "2024-11-20T10:00:00Z",
        img: "https://www.shutterstock.com/image-photo/help-friend-through-tough-time-600nw-1899282823.jpg",
        idea: item.idea,
        problem: item.problema,
        solution: item.solucion,
        buy_price: item.monto_requerido,
        sell_price: item.buy_price,
      }));

      return mappedInitiatives;  
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const showInitiativesSlice = createSlice({
  name: 'initiatives',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitiatives.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInitiatives.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives = action.payload;
      })
      .addCase(fetchInitiatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error desconocido';
      });
  },
});

export const { setFilter, setSortOrder } = showInitiativesSlice.actions;
export const selectInitiatives = (state: { initiatives: InitiativesState }) => state.initiatives;
export default showInitiativesSlice.reducer;
