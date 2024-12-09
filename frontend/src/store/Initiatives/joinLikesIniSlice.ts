import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = import.meta.env.VITE_URL_DEL_BACKEND;

interface JoinInitiativesState {
  joinedInitiatives: string[];
}

interface LikedInitiativesState {
  likedInitiatives: string[];
}

const initialJoinState: JoinInitiativesState = {
  joinedInitiatives: [],
};

const initialLikeState: LikedInitiativesState = {
  likedInitiatives: [],
};


export const fetchJoinedInitiatives = createAsyncThunk(
  'joinInitiatives/fetchJoinedInitiatives',
  async (userId: string | number) => {
    
    try {
      const response = await axios.get(`${URL}/api/social/getUserJoins/${userId}`);
      return response.data.dataIterable
    } catch (error) {
      console.error('Error al obtener las iniciativas unidas:', error);
      throw error;
    }
  }
);

// 2. Obtener las iniciativas con like desde el backend
export const fetchLikedInitiatives = createAsyncThunk(
  'likedInitiatives/fetchLikedInitiatives',
  async (userId: string | number) => {

    try {
      const response = await axios.get(`${URL}/api/social/getUserLikes/${userId}`);
      return response.data.dataIterable; 
    } catch (error) {
      console.error('Error al obtener las iniciativas con like:', error);
      throw error;
    }
  }
);

// Reducer para iniciativas unidas
export const joinInitiativesSlice = createSlice({
  name: "joinInitiatives",
  initialState: initialJoinState,
  reducers: {
    setJoinedInitiatives(state, action: PayloadAction<string[]>) {
      state.joinedInitiatives = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoinedInitiatives.pending, (state) => {
        state.joinedInitiatives = [];
      })
      .addCase(fetchJoinedInitiatives.fulfilled, (state, action) => {
        state.joinedInitiatives = action.payload;
      })
      .addCase(fetchJoinedInitiatives.rejected, (state) => {
        console.error('Error al cargar las iniciativas unidas' , state);
      });
  }
});

// Reducer para iniciativas con like
export const likedInitiativesSlice = createSlice({
  name: "likedInitiatives",
  initialState: initialLikeState,
  reducers: {
    setLikedInitiatives(state, action: PayloadAction<string[]>) {
      state.likedInitiatives = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedInitiatives.pending, (state) => {
        state.likedInitiatives = [];
      })
      .addCase(fetchLikedInitiatives.fulfilled, (state, action) => {
        state.likedInitiatives = action.payload;
      })
      .addCase(fetchLikedInitiatives.rejected, (state) => {
        console.error('Error al cargar las iniciativas con like', state);
      });
  }
});

// 3. Acción para enviar el "Like" o "Dislike"
export const sendLikeDislike = createAsyncThunk(
  'likedInitiatives/sendLikeDislike',
  async ({ initiativeId, isLiked , userId}: { initiativeId: string; isLiked: boolean , userId:string| number }) => {
    try {
      await axios.post(`${URL}/api/social/socials`, {
        userId,
        initiativeId,
        isLiked,
      });
      return { initiativeId, isLiked };
    } catch (error) {
      console.log(error);
    }
    return { initiativeId, isLiked };
  }
);

// 4. Acción para unirse o salir de una iniciativa
export const sendJoinLeave = createAsyncThunk(
  'joinInitiatives/sendJoinLeave',
  async ({ initiativeId, isJoined , userId }: { initiativeId: string; isJoined: boolean, userId: string|number }) => {
    console.log(initiativeId, isJoined , userId)
    try {
      await axios.post(`${URL}/api/social/socials`, {
        userId,
        initiativeId,
        isJoined,
      });
      return { initiativeId, isJoined };
    } catch (error) {
      console.log(error);
    }
    return { initiativeId, isJoined };
  }
);

// 5. Acción para compartir una iniciativa
export const sendShare = createAsyncThunk(
  'shareInitiatives',
  async ({ initiativeId, isShare , userId}: { initiativeId: string; isShare: boolean ,userId: string | number}) => {

    try {
      await axios.post(`${URL}/api/social/socials`, {
        userId,
        initiativeId,
        isShare,
      });
      return { initiativeId, isShare };
    } catch (error) {
      console.log(error);
    }
  }
);

export const { setJoinedInitiatives } = joinInitiativesSlice.actions;
export const { setLikedInitiatives } = likedInitiativesSlice.actions;

export const joinInitiativesReducer = joinInitiativesSlice.reducer;
export const likedInitiativesReducer = likedInitiativesSlice.reducer;
