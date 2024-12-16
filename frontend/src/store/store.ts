import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { authSlice } from "./auth/authSlice";
import { createMSlice } from "./Initiatives/createIniSlice";
import {
  joinInitiativesSlice,
  likedInitiativesSlice,
} from "./Initiatives/joinLikesIniSlice";
import { myInitiativesSlice } from "./Initiatives/myIniSlice";
import { showInitiativesSlice } from "./Initiatives/showInitiativesSlice";
import { ordersBooksSlice } from "./user/ordersUserSlice";
import { userStatsSlice } from "./user/statsUserSlice";
import { transactionsSlice } from "./user/transactionsUserSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    create: createMSlice.reducer,
    initiatives: showInitiativesSlice.reducer,
    joinInitiatives: joinInitiativesSlice.reducer,
    likeInitiatives: likedInitiativesSlice.reducer,
    myInitiatives: myInitiativesSlice.reducer,
    userStadistics: userStatsSlice.reducer,
    ordersBooks: ordersBooksSlice.reducer,
    transactions: transactionsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
