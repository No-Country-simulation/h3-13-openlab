import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const { setJoinedInitiatives } = joinInitiativesSlice.actions;
export const { setLikedInitiatives } = likedInitiativesSlice.actions;

export const joinInitiativesReducer = joinInitiativesSlice.reducer;
export const likedInitiativesReducer = likedInitiativesSlice.reducer;
