import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { authSlice } from "./auth/authSlice";
import {createMSlice} from "./Initiatives/createIniSlice";
import { showInitiativesSlice } from "./Initiatives/showInitiativesSlice";
import { joinInitiativesSlice, likedInitiativesSlice } from "./Initiatives/joinLikesIniSlice";
import { myInitiativesSlice } from "./Initiatives/myIniSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    create:createMSlice.reducer,
    initiatives: showInitiativesSlice.reducer,
    joinInitiatives: joinInitiativesSlice.reducer,
    likeInitiatives: likedInitiativesSlice.reducer,
    myInitiatives: myInitiativesSlice.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
