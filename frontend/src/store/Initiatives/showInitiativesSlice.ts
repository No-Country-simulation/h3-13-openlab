import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const URL_DEL_BACKEND = import.meta.env.URL_DEL_BACKEND

interface Initiative {
  id: string;
  name: string;
  priceFluctuation: number[]; 
  colaborator: number;
  tokens: string; 
  missions: string;
  likes: string;
  shares: string;
  createdAt: string;
  img: string;
  idea: string;
  problem: string;
  solution: string;
  price: {
    buy: number;
    sell: number;
  };
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
  // initiatives: [],
  initiatives: [
    {
      "id": "5",
      "name": "CryptoStar",
      "priceFluctuation": [500, 510, 505, 520, 515],
      "colaborator": 123,
      "tokens": "150",
      "missions": "3/5",
      "likes": "120",
      "shares": "100",
      "createdAt": "2024-11-20T10:00:00Z",
      "img": "https://example.com/images/cryptostar.jpg",
      "idea": "A cryptocurrency project aiming to revolutionize the market.",
      "problem": "Lack of efficient crypto trading platforms.",
      "solution": "A decentralized platform with low fees and high security.",
      "price": {
        "buy": 500,
        "sell": 520
      }
    },
    {
      "id": "1",
      "name": "TokenFlow",
      "priceFluctuation": [100, 2000, 305, 420, 515],
      "colaborator": 523,
      "tokens": "300",
      "missions": "2/4",
      "likes": "85",
      "shares": "100",
      "createdAt": "2024-10-20T10:00:00Z",
      "img": "https://example.com/images/tokenflow.jpg",
      "idea": "A blockchain solution to streamline token exchanges.",
      "problem": "Complex and slow token trading processes.",
      "solution": "A fast, reliable, and easy-to-use token trading platform.",
      "price": {
        "buy": 1200,
        "sell": 1150
      }
    },
    {
      "id": "7",
      "name": "TokenFlow",
      "priceFluctuation": [100, 2000, 305, 420, 515],
      "colaborator": 523,
      "tokens": "300",
      "missions": "2/4",
      "likes": "85",
      "shares": "100",
      "createdAt": "2024-10-20T10:00:00Z",
      "img": "https://example.com/images/tokenflow.jpg",
      "idea": "A blockchain solution to streamline token exchanges.",
      "problem": "Complex and slow token trading processes.",
      "solution": "A fast, reliable, and easy-to-use token trading platform.",
      "price": {
        "buy": 1200,
        "sell": 1150
      }
    },
    {
      "id": "8",
      "name": "TokenFlow",
      "priceFluctuation": [100, 2000, 305, 420, 515],
      "colaborator": 523,
      "tokens": "300",
      "missions": "2/4",
      "likes": "85",
      "shares": "100",
      "createdAt": "2024-10-20T10:00:00Z",
      "img": "https://example.com/images/tokenflow.jpg",
      "idea": "A blockchain solution to streamline token exchanges.",
      "problem": "Complex and slow token trading processes.",
      "solution": "A fast, reliable, and easy-to-use token trading platform.",
      "price": {
        "buy": 1200,
        "sell": 1150
      }
    },
    {
      "id": "2",
      "name": "BlockStream",
      "priceFluctuation": [500, 510, 505, 520, 515],
      "colaborator": 111,
      "tokens": "200",
      "missions": "4/6",
      "likes": "200",
      "shares": "100",
      "createdAt": "2024-11-21T10:00:00Z",
      "img": "https://example.com/images/blockstream.jpg",
      "idea": "A decentralized blockchain network for financial services.",
      "problem": "Lack of security in online transactions.",
      "solution": "Providing secure and anonymous transactions via blockchain.",
      "price": {
        "buy": 750,
        "sell": 800
      }
    },
    {
      "id": "3",
      "name": "ChainSecure",
      "priceFluctuation": [500, 310, 205, 420, 515],
      "colaborator": 200,
      "tokens": "120",
      "missions": "1/3",
      "likes": "50",
      "shares": "100",
      "createdAt": "2024-09-20T10:00:00Z",
      "img": "https://example.com/images/chainsecure.jpg",
      "idea": "A platform for secure blockchain-based contracts.",
      "problem": "Fraudulent contracts in the blockchain space.",
      "solution": "Smart contracts with built-in security features.",
      "price": {
        "buy": 400,
        "sell": 400
      }
    },
    {
      "id": "4",
      "name": "EcoCoin",
      "priceFluctuation": [500, 410, 305, 220, 115],
      "colaborator": 400,
      "tokens": "500",
      "missions": "5/5",
      "likes": "300",
      "shares": "100",
      "createdAt": "2024-08-20T10:00:00Z",
      "img": "https://example.com/images/ecocoin.jpg",
      "idea": "A cryptocurrency focused on environmental sustainability.",
      "problem": "Environmental issues exacerbated by traditional crypto mining.",
      "solution": "Eco-friendly mining and investment in green initiatives.",
      "price": {
        "buy": 1000,
        "sell": 1100
      }
    }
  ],
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

