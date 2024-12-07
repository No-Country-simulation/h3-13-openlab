import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'https://api.tuservicio.com/user/statistics';


export const fetchUserStatistics = createAsyncThunk(
  'userStats/fetchUserStatistics',
  async () => {
    const response = await axios.get(API_URL);
    return response.data; 
  }
);

const initialState = {
  statistics: {
    createdInitiatives: 0,
    sharedInitiatives: 0,
    joinedInitiatives: 0,
    solvedMissions: 0,
    validatedMissions: 0,
    initiativeLikes: 0,
    generatedTokens: 0
  },
  loading: false,
  error: null as string | null
};


export const userStatsSlice = createSlice({
  name: 'userStats',
  initialState,
  reducers: {

    setStatistics: (state, action) => {
      state.statistics = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStatistics.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchUserStatistics.fulfilled, (state, action) => {
        state.loading = false; 
        state.statistics = action.payload; 
        state.error = null; 
      })
      .addCase(fetchUserStatistics.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message || 'Error desconocido';
      });
  }
});


export const { setStatistics } = userStatsSlice.actions;


export default userStatsSlice.reducer;
