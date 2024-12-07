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
  initiatives: [
    {
      "id": "1",
      "name": "Extructor BV",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 10 },
        { "date": "2024-11-23", "value": 27 },
        { "date": "2024-11-24", "value": 20 },
        { "date": "2024-11-25", "value": 35 },
        { "date": "2024-11-26", "value": 30 },
        { "date": "2024-11-27", "value": 35 },
        { "date": "2024-11-28", "value": 50 },
        { "date": "2024-11-29", "value": 45 },
        { "date": "2024-11-30", "value": 50 },
        { "date": "2024-12-01", "value": 55 }
      ],
      "colaborator": 3,
      "tokens": "EXTBV",
      "missions": "110/200",
      "likes": 150,
      "shares": "35",
      "createdAt": "2024-12-03T10:00:00Z",
      "logo": "https://cdn3d.iconscout.com/3d/premium/thumb/bitcoin-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--logo-cryptocurrency-btc-gold-symbol-pack-science-technology-illustrations-3495806.png?f=webp",
      "idea": "Crear un programa de educación para personas con discapacidades.",
      "opportunity": "Educación para personas con discapacidades",
      "problem": "Falta de acceso a educación de calidad ",
      "solution": "Implementar aulas virtuales y materiales educativos digitales.",
      "buy_price": 100,
      "sell_price": 200
    },
    {
      "id": "2",
      "name": "Init Comunity",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 15 },
        { "date": "2024-11-23", "value": 2 },
        { "date": "2024-11-24", "value": 89 },
        { "date": "2024-11-25", "value": 45 },
        { "date": "2024-11-26", "value": 60 },
        { "date": "2024-11-27", "value": 35 },
        { "date": "2024-11-28", "value": 40 },
        { "date": "2024-11-29", "value": 85 },
        { "date": "2024-11-30", "value": 30 },
        { "date": "2024-12-01", "value": 55 }
      ],
      "colaborator": 3,
      "tokens": "INITC",
      "missions": "110/200",
      "likes": 150,
      "shares": "35",
      "createdAt": "2024-01-15T10:00:00Z",
      "logo": "https://cryptologos.cc/logos/oasis-network-rose-logo.png",
      "idea": "Crear un programa de educación en línea para niños en comunidades rurales.",
      "opportunity": "Programa de educación rural",
      "problem": "Falta de acceso a educación de calidad en ciertas zonas de Argentina.",
      "solution": "Implementar aulas virtuales y materiales educativos digitales.",
      "buy_price": 80,
      "sell_price": 65
    },
    {
      "id": "3",
      "name": "GreenTech",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 30 },
        { "date": "2024-11-23", "value": 40 },
        { "date": "2024-11-24", "value": 28 },
        { "date": "2024-11-25", "value": 50 },
        { "date": "2024-11-26", "value": 55 },
        { "date": "2024-11-27", "value": 50 },
        { "date": "2024-11-28", "value": 70 },
        { "date": "2024-11-29", "value": 75 },
        { "date": "2024-11-30", "value": 80 },
        { "date": "2024-12-01", "value": 85 }
      ],
      "colaborator": 5,
      "tokens": "GTEC",
      "missions": "120/250",
      "likes": 200,
      "shares": "40",
      "createdAt": "2024-12-01T11:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/256/7390/7390920.png?semt=ais_hybrid",
      "idea": "Crear una plataforma de energías renovables para pequeñas comunidades.",
      "opportunity": "Plataforma de energías renovables ",
      "problem": "Acceso limitado a energías limpias y sostenibles.",
      "solution": "Proveer soluciones de energía solar y eólica accesibles.",
      "buy_price": 150,
      "sell_price": 200
    },
    {
      "id": "4",
      "name": "TechSolve",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 50 },
        { "date": "2024-11-23", "value": 55 },
        { "date": "2024-11-24", "value": 40 },
        { "date": "2024-11-25", "value": 45 },
        { "date": "2024-11-26", "value": 20 },
        { "date": "2024-11-27", "value": 15 },
        { "date": "2024-11-28", "value": 40 },
        { "date": "2024-11-29", "value": 25 },
        { "date": "2024-11-30", "value": 30 },
        { "date": "2024-12-01", "value": 15 }
      ],
      "colaborator": 6,
      "tokens": "TSOL",
      "missions": "130/300",
      "likes": 250,
      "shares": "50",
      "createdAt": "2024-03-05T12:00:00Z",
      "logo": "https://img.freepik.com/free-vector/flat-design-crypto-mining-logo-template_23-2149409054.jpg?t=st=1733358748~exp=1733362348~hmac=f91aaa5b2f857bf71528c312367ef62b7f6cbb30dc88e90bfd6465c1b2f5464a&w=740",
      "idea": "Soluciones tecnológicas para la gestión de recursos en empresas.",
      "opportunity": "Mejora de gestión de recursos en empresas",
      "problem": "Falta de herramientas eficientes para gestión de recursos.",
      "solution": "Desarrollar software especializado para empresas medianas.",
      "buy_price": 200,
      "sell_price": 300
    },
    {
      "id": "5",
      "name": "EduCare",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 20 },
        { "date": "2024-11-23", "value": 25 },
        { "date": "2024-11-24", "value": 10 },
        { "date": "2024-11-25", "value": 35 },
        { "date": "2024-11-26", "value": 50 },
        { "date": "2024-11-27", "value": 45 },
        { "date": "2024-11-28", "value": 50 },
        { "date": "2024-11-29", "value": 24 },
        { "date": "2024-11-30", "value": 60 },
        { "date": "2024-12-01", "value": 65 }
      ],
      "colaborator": 4,
      "tokens": "EDUC",
      "missions": "140/350",
      "likes": 180,
      "shares": "45",
      "createdAt": "2024-04-15T13:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/256/18309/18309614.png?semt=ais_hybrid",
      "idea": "Plataforma de educación para mejorar habilidades laborales.",
      "opportunity": "Mejorar habilidades laborales",
      "problem": "Falta de preparación en habilidades técnicas en jóvenes profesionales.",
      "solution": "Ofrecer cursos online con certificación de habilidades técnicas.",
      "buy_price": 120,
      "sell_price": 150
    },
    {
      "id": "6",
      "name": "HealthFirst",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 50 },
        { "date": "2024-11-23", "value": 55 },
        { "date": "2024-11-24", "value": 60 },
        { "date": "2024-11-25", "value": 25 },
        { "date": "2024-11-26", "value": 70 },
        { "date": "2024-11-27", "value": 75 },
        { "date": "2024-11-28", "value": 10 },
        { "date": "2024-11-29", "value": 85 },
        { "date": "2024-11-30", "value": 90 },
        { "date": "2024-12-01", "value": 95 }
      ],
      "colaborator": 7,
      "tokens": "HLTF",
      "missions": "150/400",
      "likes": 300,
      "shares": "60",
      "createdAt": "2024-05-01T14:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/256/9164/9164567.png?semt=ais_hybrid",
      "idea": "Aplicación móvil para la gestión de la salud personal.",
      "opportunity": "Gestión sobre la salud personal.",
      "problem": "Dificultad para llevar un control de salud personal de manera efectiva.",
      "solution": "Proveer un app con recordatorios y seguimiento de salud.",
      "buy_price": 180,
      "sell_price": 220
    },
    {
      "id": "7",
      "name": "AgroPlus",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 38 },
        { "date": "2024-11-23", "value": 30 },
        { "date": "2024-11-24", "value": 35 },
        { "date": "2024-11-25", "value": 40 },
        { "date": "2024-11-26", "value": 25 },
        { "date": "2024-11-27", "value": 50 },
        { "date": "2024-11-28", "value": 85 },
        { "date": "2024-11-29", "value": 60 },
        { "date": "2024-11-30", "value": 25 },
        { "date": "2024-12-01", "value": 10 }
      ],
      "colaborator": 2,
      "tokens": "AGPL",
      "missions": "160/500",
      "likes": 500,
      "shares": "80",
      "createdAt": "2024-06-20T15:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/128/683/683451.png",
      "idea": "Plataforma para optimizar la productividad agrícola.",
      "opportunity": "Optimizar la productividad agrícola",
      "problem": "Falta de herramientas tecnológicas para mejorar la eficiencia agrícola.",
      "solution": "Desarrollar tecnología para la gestión de cultivos.",
      "buy_price": 100,
      "sell_price": 150
    },
    {
      "id": "8",
      "name": "FinTechPro",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 40 },
        { "date": "2024-11-23", "value": 45 },
        { "date": "2024-11-24", "value": 20 },
        { "date": "2024-11-25", "value": 55 },
        { "date": "2024-11-26", "value": 60 },
        { "date": "2024-11-27", "value": 45 },
        { "date": "2024-11-28", "value": 70 },
        { "date": "2024-11-29", "value": 75 },
        { "date": "2024-11-30", "value": 80 },
        { "date": "2024-12-01", "value": 85 }
      ],
      "colaborator": 4,
      "tokens": "FINP",
      "missions": "170/600",
      "likes": 450,
      "shares": "70",
      "createdAt": "2024-07-10T16:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/256/10429/10429849.png?semt=ais_hybrid",
      "idea": "Plataforma de soluciones financieras para pequeñas y medianas empresas.",
      "opportunity": "Soluciones financieras",
      "problem": "Falta de acceso a crédito y servicios financieros en PYMES.",
      "solution": "Brindar préstamos e inversiones accesibles a pequeñas empresas.",
      "buy_price": 250,
      "sell_price": 300
    },
    {
      "id": "9",
      "name": "SmartHomes",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 35 },
        { "date": "2024-11-23", "value": 40 },
        { "date": "2024-11-24", "value": 45 },
        { "date": "2024-11-25", "value": 10 },
        { "date": "2024-11-26", "value": 55 },
        { "date": "2024-11-27", "value": 60 },
        { "date": "2024-11-28", "value": 65 },
        { "date": "2024-11-29", "value": 20 },
        { "date": "2024-11-30", "value": 75 },
        { "date": "2024-12-01", "value": 80 }
      ],
      "colaborator": 3,
      "tokens": "SMHT",
      "missions": "180/700",
      "likes": 400,
      "shares": "90",
      "createdAt": "2024-08-05T17:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/256/6062/6062177.png?semt=ais_hybrid",
      "idea": "Soluciones inteligentes para hogares sostenibles.",
      "opportunity": "Soluciones inteligentes",
      "problem": "Desperdicio energético en hogares.",
      "solution": "Crear dispositivos inteligentes para gestionar el consumo energético.",
      "buy_price": 220,
      "sell_price": 300
    },
    {
      "id": "10",
      "name": "EduLink",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 45 },
        { "date": "2024-11-23", "value": 50 },
        { "date": "2024-11-24", "value": 35 },
        { "date": "2024-11-25", "value": 60 },
        { "date": "2024-11-26", "value": 85 },
        { "date": "2024-11-27", "value": 70 },
        { "date": "2024-11-28", "value": 75 },
        { "date": "2024-11-29", "value": 100 },
        { "date": "2024-11-30", "value": 85 },
        { "date": "2024-12-01", "value": 90 }
      ],
      "colaborator": 5,
      "tokens": "EDUL",
      "missions": "190/800",
      "likes": 350,
      "shares": "100",
      "createdAt": "2024-09-10T18:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/256/12970/12970693.png?semt=ais_hybrid",
      "idea": "Red de educación global con acceso a cursos gratuitos.",
      "opportunity": "Educación global gratuita",
      "problem": "Falta de acceso a educación gratuita a nivel mundial.",
      "solution": "Crear una plataforma con recursos educativos de acceso libre.",
      "buy_price": 200,
      "sell_price": 250
    },
    {
      "id": "11",
      "name": "CleanEnergy",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 60 },
        { "date": "2024-11-23", "value": 65 },
        { "date": "2024-11-24", "value": 80 },
        { "date": "2024-11-25", "value": 75 },
        { "date": "2024-11-26", "value": 80 },
        { "date": "2024-11-27", "value": 45 },
        { "date": "2024-11-28", "value": 90 },
        { "date": "2024-11-29", "value": 65 },
        { "date": "2024-11-30", "value": 100 },
        { "date": "2024-12-01", "value": 105 }
      ],
      "colaborator": 6,
      "tokens": "CLEN",
      "missions": "200/900",
      "likes": 550,
      "shares": "110",
      "createdAt": "2024-10-15T19:00:00Z",
      "logo": "https://cdn-icons-png.freepik.com/256/10429/10429931.png?semt=ais_hybrid",
      "idea": "Soluciones para promover energías renovables a gran escala.",
      "opportunity": "Promover energías renovables",
      "problem": "Dependencia de fuentes de energía no renovables.",
      "solution": "Fomentar el uso de energías renovables en el sector industrial.",
      "buy_price": 250,
      "sell_price": 350
    },
    {
      "id": "12",
      "name": "CyberSecPro",
      "priceFluctuation": [
        { "date": "2024-11-22", "value": 80 },
        { "date": "2024-11-23", "value": 75 },
        { "date": "2024-11-24", "value": 90 },
        { "date": "2024-11-25", "value": 75 },
        { "date": "2024-11-26", "value": 100 },
        { "date": "2024-11-27", "value": 90 },
        { "date": "2024-11-28", "value": 115 },
        { "date": "2024-11-29", "value": 100 },
        { "date": "2024-11-30", "value": 125 },
        { "date": "2024-12-01", "value": 130 }
      ],
      "colaborator": 7,
      "tokens": "CYBP",
      "missions": "210/1000",
      "likes": 600,
      "shares": "120",
      "createdAt": "2024-10-01T20:00:00Z",
      "logo": "https://www.iconpacks.net/icons/2/free-cryptocurrency-coin-icon-2422-thumb.png",
      "idea": "Plataforma para mejorar la seguridad cibernética.",
      "opportunity": "Mejorar la seguridad cibernética.",
      "problem": "Aumento de las amenazas en ciberseguridad.",
      "solution": "Desarrollar una solución integral para proteger a empresas de ciberataques.",
      "buy_price": 300,
      "sell_price": 400
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
