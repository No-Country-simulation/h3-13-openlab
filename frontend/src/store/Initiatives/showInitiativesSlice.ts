import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

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
  sortCriteria: 'name' | 'collaborator' | 'buy_price' | 'sell_price' | 'likes' | 'shares';
  sortOrder: 'asc' | 'desc';
}

const initialState: InitiativesState = {
  initiatives: [
      {
        "id": "1",
        "name": "EcoTech Innovations",
        "priceFluctuation": [1.05, 1.12, 1.08, 1.15, 1.07],
        "colaborator": 3,
        "tokens": "ETH",
        "missions": "100/200",
        "likes": 1205,
        "shares": "1500",
        "createdAt": "2024-11-27T14:00:00Z",
        "img": "https://example.com/images/ecoTech.jpg",
        "idea": "To create energy-efficient solutions that tackle the environmental crisis.",
        "problem": "The growing environmental pollution and high energy consumption.",
        "solution": "Developing cutting-edge technology that helps businesses reduce energy use and their carbon footprint.",
        "buy_price": 250.0,
        "sell_price": 320.0
      },
      {
        "id": "2",
        "name": "HealthTrack AI",
        "priceFluctuation": [0.95, 1.02, 1.08, 1.00, 0.98],
        "colaborator": 5,
        "tokens": "BTC",
        "missions": "100/200",
        "likes": 890,
        "shares": "1100",
        "createdAt": "2024-11-10T09:30:00Z",
        "img": "https://example.com/images/healthTrack.jpg",
        "idea": "To build AI-powered tools for early detection of diseases and health monitoring.",
        "problem": "Delays in disease diagnosis and lack of accessibility to early health tracking.",
        "solution": "AI-driven solutions that analyze medical data to predict diseases and provide continuous health monitoring.",
        "buy_price": 300.0,
        "sell_price": 380.0
      },
      {
        "id": "3",
        "name": "SmartAgri Solutions",
        "priceFluctuation": [0.90, 0.92, 0.95, 0.98, 1.00],
        "colaborator": 4,
        "tokens": "USDT",
        "missions": "100/200",
        "likes": 1320,
        "shares": "1450",
        "createdAt": "2024-10-25T16:45:00Z",
        "img": "https://example.com/images/smartAgri.jpg",
        "idea": "To implement IoT-based solutions that enhance farming productivity and sustainability.",
        "problem": "Decreasing crop yields due to outdated agricultural methods.",
        "solution": "Developing a smart farming platform that uses sensors and data analytics to optimize irrigation, fertilization, and pest control.",
        "buy_price": 180.0,
        "sell_price": 210.0
      },
      {
        "id": "4",
        "name": "CleanEnergy Ventures",
        "priceFluctuation": [1.10, 1.12, 1.14, 1.08, 1.07],
        "colaborator": 2,
        "tokens": "ETH",
        "missions": "100/200",
        "likes": 1450,
        "shares": "1750",
        "createdAt": "2024-09-18T12:00:00Z",
        "img": "https://example.com/images/cleanEnergy.jpg",
        "idea": "Developing new technologies for harnessing solar, wind, and water energy.",
        "problem": "The world's dependency on fossil fuels and the resulting environmental damage.",
        "solution": "Investing in new renewable energy technologies that can replace traditional energy sources.",
        "buy_price": 350.0,
        "sell_price": 450.0
      },
      {
        "id": "5",
        "name": "MedTech Revolution",
        "priceFluctuation": [1.00, 1.05, 1.07, 1.02, 1.04],
        "colaborator": 7,
        "tokens": "BTC",
        "missions": "100/200",
        "likes": 1750,
        "shares": "2000",
        "createdAt": "2024-11-15T08:30:00Z",
        "img": "https://example.com/images/medTech.jpg",
        "idea": "Designing and manufacturing innovative medical devices for better diagnostics.",
        "problem": "Inaccurate diagnostic tools and slow health response time in critical cases.",
        "solution": "Developing AI-powered devices that can provide real-time health diagnostics in emergency situations.",
        "buy_price": 400.0,
        "sell_price": 480.0
      },
      {
        "id": "6",
        "name": "AI Legal Advisors",
        "priceFluctuation": [1.05, 1.08, 1.10, 1.12, 1.15],
        "colaborator": 3,
        "tokens": "ETH",
        "missions": "100/200",
        "likes": 950,
        "shares": "1200",
        "createdAt": "2024-11-28T10:00:00Z",
        "img": "https://example.com/images/aiLegal.jpg",
        "idea": "To create an AI platform that helps individuals and businesses access legal advice easily.",
        "problem": "The high cost and complexity of accessing quality legal advice.",
        "solution": "Building a platform that offers AI-powered legal consultations at a fraction of the cost.",
        "buy_price": 220.0,
        "sell_price": 300.0
      },
      {
        "id": "7",
        "name": "FoodTech Solutions",
        "priceFluctuation": [1.01, 1.04, 1.06, 1.02, 1.03],
        "colaborator": 6,
        "tokens": "USDT",
        "missions": "100/200",
        "likes": 1100,
        "shares": "1400",
        "createdAt": "2024-10-30T11:00:00Z",
        "img": "https://example.com/images/foodTech.jpg",
        "idea": "To create tech-driven solutions that address global food insecurity.",
        "problem": "Food scarcity and waste in developing countries.",
        "solution": "Using AI, blockchain, and IoT to optimize food production and distribution.",
        "buy_price": 160.0,
        "sell_price": 200.0
      },
      {
        "id": "8",
        "name": "FinTech Innovations",
        "priceFluctuation": [0.97, 1.00, 1.02, 1.04, 1.01],
        "colaborator": 4,
        "tokens": "BTC",
        "missions": "100/200",
        "likes": 1280,
        "shares": "1550",
        "createdAt": "2024-11-29T13:30:00Z",
        "img": "https://example.com/images/finTech.jpg",
        "idea": "To provide financial tools that empower individuals and businesses in underserved markets.",
        "problem": "Limited access to banking services for people in remote or underserved areas.",
        "solution": "Developing mobile-based platforms that offer loans, savings, and payments to underserved populations.",
        "buy_price": 275.0,
        "sell_price": 350.0
      }
  ],
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
      const response = await axios.get(`${URL}/api/iniciativa/getAll`);
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
