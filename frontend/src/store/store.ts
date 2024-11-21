import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { authSlice } from "./auth/authSlice";
import {createMSlice} from "./Initiatives/createIniSlice"


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    create:createMSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
