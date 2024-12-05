import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const URL = import.meta.env.VITE_URL_DEL_BACKEND;

export interface PriceFluctuation {
  date: string;
  value: number;
}
export interface Initiative {
  id: string;
  name: string;
  priceFluctuation: PriceFluctuation[]
  colaborator: number;
  tokens: string;
  missions: string;
  likes: number;
  shares: string;
  createdAt: string;
  logo: string;
  idea: string;
  opportunity: string;
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
  sortCriteria: 'name' | 'collaborator' | 'buy_price' | 'sell_price' | 'likes' | 'shares';
  sortOrder: 'asc' | 'desc';
}

const initialState: InitiativesState = {
  initiatives: [],
  loading: false,
  error: null,
  filter: '',
  sortCriteria: 'name', 
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
      const response = await axios.get(`${URL}/api/iniciativa/getAllIniciativas`);
      const mappedInitiatives = response.data.dataIterable.map((item: BackendInitiative) => ({
        id: String(item.id),
        name: item.nombre,
        priceFluctuation: [
          { date: "2024-11-22", value: 15 },
          { date: "2024-11-23", value: 2 },
          { date: "2024-11-24", value: 89 },
          { date: "2024-11-25", value: 45 },
          { date: "2024-11-26", value: 60 },
          { date: "2024-11-27", value: 35 },
          { date: "2024-11-28", value: 40 },
          { date: "2024-11-29", value: 85 },
          { date: "2024-11-30", value: 30 },
          { date: "2024-12-01", value: 55 },
        ],
        colaborator: item.colaboradores,
        tokens: 400,
        missions: `${item.misiones_actuales}/${item.misiones_objetivo}`,
        likes: item.likes,
        shares: item.shares,
        createdAt: "2024-11-20T10:00:00Z",
        logo: "https://www.shutterstock.com/image-photo/help-friend-through-tough-time-600nw-1899282823.jpg",
        idea: item.idea,
        problem: item.problema,
        solution: item.solucion,
        opportunity: item.oportunidad,
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
    setSortCriteria: (state, action) => {
      state.sortCriteria = action.payload; 
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

export const { setFilter, setSortOrder , setSortCriteria} = showInitiativesSlice.actions;

export const selectFilteredAndSortedInitiatives = (state: RootState) => {
  const { initiatives, filter, sortCriteria, sortOrder } = state.initiatives;


  const filteredInitiatives = initiatives.filter((initiative: Initiative) =>
    initiative.name.toLowerCase().includes(filter.toLowerCase())
  );


  const sortedInitiatives = filteredInitiatives.sort((a: Initiative, b: Initiative) => {
    let comparison = 0;

    switch (sortCriteria) {
      case 'name':
        comparison = a.name.localeCompare(b.name); 
        break;
      case 'collaborator':
        comparison = a.colaborator - b.colaborator;
        break;
      case 'buy_price':
        comparison = a.buy_price - b.buy_price;  
        break;
      case 'sell_price':
        comparison = a.sell_price - b.sell_price; 
        break; 
      case 'likes':
        comparison = a.likes - b.likes; 
        break;
      case 'shares':
        comparison = a.shares.localeCompare(b.shares);  
        break;
      default:
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return sortedInitiatives;
};

export default showInitiativesSlice.reducer;
