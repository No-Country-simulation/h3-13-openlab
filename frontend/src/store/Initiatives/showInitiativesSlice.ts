import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const URL_DEL_BACKEND = import.meta.env.URL_DEL_BACKEND

interface Initiative {
  id: string;
  name: string;
//Falta mas info de las iniciativas :(
}

interface InitiativesState {
  initiatives: Initiative[];
  loading: boolean;
  error: string | null;
  filter: string; 
  sortOrder: 'asc' | 'desc'; 
}

// Estado inicial
const initialState: InitiativesState = {
  initiatives: [],
  loading: false,
  error: null,
  filter: '', 
  sortOrder: 'asc', 
};

export const fetchInitiatives = createAsyncThunk(
  'initiatives/fetchInitiatives',
  async () => {
    const response = await fetch(`${URL_DEL_BACKEND}/initiatives`); //Modificar
    if (!response.ok) {
      throw new Error('Error al cargar las iniciativas');
    }
    return response.json();
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

