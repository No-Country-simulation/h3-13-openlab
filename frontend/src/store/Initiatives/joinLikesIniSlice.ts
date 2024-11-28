import { createSlice, PayloadAction , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from '../store';
const URL = import.meta.env.VITE_URL_DEL_BACKEND; 
import { useSelector } from "react-redux";

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

 export const joinInitiativesSlice = createSlice({
  name: "joinInitiatives",
  initialState: initialJoinState,
  reducers: {
    setJoinedInitiatives(state, action: PayloadAction<string[]>) {
      state.joinedInitiatives = action.payload;
    },
  },
});


export const likedInitiativesSlice = createSlice({
  name: "likedInitiatives",
  initialState: initialLikeState,
  reducers: {
    setLikedInitiatives(state, action: PayloadAction<string[]>) {
      state.likedInitiatives = action.payload;
    },
  },
});

//  Like o Dislike 
export const sendLikeDislike = createAsyncThunk(
  'likedInitiatives/sendLikeDislike',
  async ({ initiativeId, isLiked }: {  initiativeId: string; isLiked: boolean }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    try {
      await axios.post(`${URL}/api/social/socials`, { 
        userId : user?.id,
        initiativeId,
        isLiked,
      });
      return { initiativeId, isLiked };
    } catch (error) {
      console.log(error);
    }
  }
);

// Join o Leave 
export const sendJoinLeave = createAsyncThunk(
  'joinInitiatives/sendJoinLeave',
  async ({  initiativeId, isJoined }: {  initiativeId: string; isJoined: boolean }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    try {
      await axios.post(`${URL}/api/social/socials`, {
        userId: user?.id,
        initiativeId,
        isJoined,
      });
      return { initiativeId, isJoined };
    } catch (error) {
     console.log(error);
    }
  }
);

//Share
export const sendShare = createAsyncThunk(
  'shareInitiatives',
  async ({  initiativeId, isShare }: {  initiativeId: string; isShare: boolean }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    try {
      await axios.post(`${URL}/api/social/socials`, {
        userId: user?.id,
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