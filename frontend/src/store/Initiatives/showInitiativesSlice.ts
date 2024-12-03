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
  initiatives:[
      {
        "id": "1",
        "name": "Iniciativa Educativa",
        "priceFluctuation":  [
  { "date": "2024-01-01", "value": 10 },
  { "date": "2024-01-02", "value": 12 },
  { "date": "2024-01-03", "value": 15 },
  { "date": "2024-01-04", "value": 18 },
  { "date": "2024-01-05", "value": 20 },
  { "date": "2024-01-06", "value": 25 },
  { "date": "2024-01-07", "value": 30 },
  { "date": "2024-01-08", "value": 28 },
  { "date": "2024-01-09", "value": 26 },
  { "date": "2024-01-10", "value": 22 }
],
        "colaborator": 3,
        "tokens": "ABC123",
        "missions": "110/200",
        "likes": 150,
        "shares": "35",
        "createdAt": "2024-01-15T10:00:00Z",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJ9Vsvk_QnBTJlrLSLoTIfsPeLdyTC7HS1Xe7KVX2eXoS-MTTkm4qmng0MfjUOKY9Ih8&usqp=CAU",
        "opportunity": "opportunity.",
        "idea": "Crear un programa de educación en línea para niños en comunidades rurales.",
        "problem": "Falta de acceso a educación de calidad en ciertas zonas de Argentina.",
        "solution": "Implementar aulas virtuales y materiales educativos digitales.",
        "buy_price": 100,
        "sell_price": 200
      },
      {
        "id": "2",
        "name": "Reciclaje Sostenible",
        "priceFluctuation":  [
          { "date": "2024-01-04", "value": 20 },
          { "date": "2024-01-05", "value": 22 },
          { "date": "2024-01-06", "value": 25 },
          { "date": "2024-01-07", "value": 28 },
          { "date": "2024-01-08", "value": 20 },
          { "date": "2024-01-09", "value": 25 },
          { "date": "2024-01-10", "value": 20 },
          { "date": "2024-01-11", "value": 38 },
          { "date": "2024-01-12", "value": 36 },
          { "date": "2024-01-13", "value": 32 }
        ],
        "colaborator": 5,
        "tokens": "DEF456",
        "missions": "110/120",
        "likes": 200,
        "shares": "40",
        "createdAt": "2024-02-20T10:00:00Z",
        "logo": "https://img.freepik.com/vector-premium/ilustracion-icono-vectorial-dinero-digital-conjunto-iconos-criptomonedas_904970-140485.jpg",
        "idea": "Fomentar hábitos de reciclaje mediante campañas educativas.",
        "opportunity": "opportunity.",
        "problem": "El bajo nivel de conciencia sobre la importancia del reciclaje.",
        "solution": "Organizar eventos de reciclaje y educar sobre la separación de residuos.",
        "buy_price": 50,
        "sell_price": 100
      },
      {
        "id": "3",
        "name": "Ayuda Alimentaria",
        "priceFluctuation":  [
          { "date": "2024-01-01", "value": 15 },
          { "date": "2024-01-02", "value": 25 },
          { "date": "2024-01-03", "value": 15 },
          { "date": "2024-01-04", "value": 88 },
          { "date": "2024-01-05", "value": 90 },
          { "date": "2024-01-06", "value": 25 },
          { "date": "2024-01-07", "value": 60 },
          { "date": "2024-01-08", "value": 18 },
          { "date": "2024-01-09", "value": 26 },
          { "date": "2024-01-10", "value": 22 }
        ],
        "colaborator": 10,
        "tokens": "GHI789",
        "missions": "110/120",
        "likes": 300,
        "shares": "50",
        "createdAt": "2024-03-05T10:00:00Z",
        "logo": "https://img.freepik.com/vector-premium/icono-vectorial-bitcoin-puede-usar-conjunto-iconos-banca-finanzas_717774-49184.jpg",
        "idea": "Crear un sistema de distribución de alimentos de forma eficiente y equitativa.",
        "problem": "La inseguridad alimentaria en diversas comunidades.",
        "opportunity": "opportunity.",
        "solution": "Organizar donaciones y crear centros de acopio de alimentos.",
        "buy_price": 30,
        "sell_price": 70
      },
      {
        "id": "4",
        "name": "Voluntariado en Salud",
        "priceFluctuation":  [
          { "date": "2024-01-01", "value": 30 },
          { "date": "2024-01-02", "value": 32 },
          { "date": "2024-01-03", "value": 35 },
          { "date": "2024-01-04", "value": 38 },
          { "date": "2024-01-05", "value": 50 },
          { "date": "2024-01-06", "value": 55 },
          { "date": "2024-01-07", "value": 80 },
          { "date": "2024-01-08", "value": 68 },
          { "date": "2024-01-09", "value": 66 },
          { "date": "2024-01-10", "value": 42 }
        ],
        "colaborator": 7,
        "tokens": "JKL101",
        "missions": "110/120",
        "likes": 120,
        "shares": "30",
        "createdAt": "2024-04-01T10:00:00Z",
        "logo": "https://img.freepik.com/vector-premium/imagen-vectorial-icono-bitcoin-puede-utilizar-banca-finanzas_120816-261887.jpg",
        "idea": "Proveer atención médica a las personas sin acceso a servicios de salud.",
        "problem": "La falta de infraestructura médica en ciertas áreas.",
        "opportunity": "opportunity.",
        "solution": "Organizar clínicas móviles y jornadas de salud gratuitas.",
        "buy_price": 70,
        "sell_price": 150
      },
      {
        "id": "5",
        "name": "Recuperación de Espacios Verdes",
        "priceFluctuation":  [
          { "date": "2024-01-01", "value": 10 },
          { "date": "2024-01-02", "value": 12 },
          { "date": "2024-01-03", "value": 15 },
          { "date": "2024-01-04", "value": 18 },
          { "date": "2024-01-05", "value": 20 },
          { "date": "2024-01-06", "value": 25 },
          { "date": "2024-01-07", "value": 30 },
          { "date": "2024-01-08", "value": 28 },
          { "date": "2024-01-09", "value": 26 },
          { "date": "2024-01-10", "value": 22 }
        ],
        "colaborator": 4,
        "tokens": "MNO112",
        "missions": "Recuperar parques y espacios verdes urbanos.",
        "opportunity": "opportunity.",
        "likes": 90,
        "shares": "10",
        "createdAt": "2024-05-10T10:00:00Z",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGL79xEAa-r2EEw7nJg9I5IQIHu6KRaOlZTaSFldakpozM3svoNxHLpnWEXm1xvCaDR8&usqp=CAU",
        "idea": "Recuperar espacios verdes para mejorar la calidad de vida en las ciudades.",
        "problem": "La contaminación y el deterioro de los espacios públicos.",
        "solution": "Reforestar y restaurar parques y áreas recreativas.",
        "buy_price": 40,
        "sell_price": 80
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
