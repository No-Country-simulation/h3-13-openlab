import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Initiative } from "./showInitiativesSlice";
import { BackendInitiative } from "./showInitiativesSlice";

const URL = import.meta.env.VITE_URL_DEL_BACKEND;

interface InitiativesState {
  myInitiatives: Initiative[];
  loading: boolean;
  error: string | null;
  filter: string;
  sortCriteria:
    | "name"
    | "collaborator"
    | "buy_price"
    | "sell_price"
    | "likes"
    | "shares";
  sortOrder: "asc" | "desc";
}

// Estado inicial
const initialState: InitiativesState = {
  myInitiatives: [],
  loading: false,
  error: null,
  filter: "",
  sortCriteria: "name",
  sortOrder: "asc",
};

export const fetchMyInitiatives = createAsyncThunk(
  "initiatives/fetchMyInitiatives",
  async (userId: string | number) => {
    try {
      const response = await axios.get(
        `${URL}iniciativa/getUserIniciativas/${userId}`
      );
      const mappedInitiatives = response.data.dataIterable.map(
        (item: BackendInitiative) => ({
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
          tokenDao: "AYU",
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
        })
      );

      return mappedInitiatives;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error al obtener las iniciativas"
      );
    }
  }
);

export const myInitiativesSlice = createSlice({
  name: "initiatives",
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
      .addCase(fetchMyInitiatives.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyInitiatives.fulfilled, (state, action) => {
        state.loading = false;
        state.myInitiatives = action.payload;
      })
      .addCase(fetchMyInitiatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Algo salió mal";
      });
  },
});

export const { setFilter, setSortCriteria, setSortOrder } =
  myInitiativesSlice.actions;

export const selectFilteredAndSortedInitiatives = (state: RootState) => {
  const { myInitiatives, filter, sortCriteria, sortOrder } =
    state.myInitiatives;

  const filteredInitiatives = myInitiatives.filter((initiative: Initiative) =>
    initiative.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedInitiatives = filteredInitiatives.sort(
    (a: Initiative, b: Initiative) => {
      let comparison = 0;

      switch (sortCriteria) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "collaborator":
          comparison = a.colaborator - b.colaborator;
          break;
        case "buy_price":
          comparison = a.buy_price - b.buy_price;
          break;
        case "sell_price":
          comparison = a.sell_price - b.sell_price;
          break;
        case "likes":
          comparison = a.likes - b.likes;
          break;
        case "shares":
          comparison = a.shares.localeCompare(b.shares);
          break;
        default:
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    }
  );

  return sortedInitiatives;
};

export default myInitiativesSlice.reducer;
