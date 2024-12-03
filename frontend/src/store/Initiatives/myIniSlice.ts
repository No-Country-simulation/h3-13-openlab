import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Initiative } from './showInitiativesSlice';

const URL = import.meta.env.VITE_URL_DEL_BACKEND;

interface InitiativesState {
  myInitiatives: Initiative[];
  loading: boolean;
  error: string | null;
  filter: string;
  sortCriteria: 'name' | 'collaborator' | 'buy_price' | 'sell_price' | 'likes' | 'shares';
  sortOrder: 'asc' | 'desc';
}

// Estado inicial
const initialState: InitiativesState = {
  myInitiatives:[],  
  loading: false,
  error: null,
  filter: '',
  sortCriteria: 'name', 
  sortOrder: 'asc', 
};

export const fetchInitiatives = createAsyncThunk(
  'initiatives/fetchInitiatives',
  async (_, { getState }) => {
    const { user } = (getState() as RootState).auth;

    try {
      const response = await axios.get(`${URL}/api/iniciativa/getUserIniciativas/${user?.id}`);
      return response.data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error al obtener las iniciativas');
    }
  }
);

export const myInitiativesSlice = createSlice({
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
        state.myInitiatives = action.payload;
      })
      .addCase(fetchInitiatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Algo salió mal';
      });
  },
});

export const { setFilter, setSortCriteria, setSortOrder } = myInitiativesSlice.actions;


export const selectFilteredAndSortedInitiatives = (state: RootState) => {
  const { myInitiatives, filter, sortCriteria, sortOrder } = state.myInitiatives;


  const filteredInitiatives = myInitiatives.filter((initiative: Initiative) =>
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

export default myInitiativesSlice.reducer;