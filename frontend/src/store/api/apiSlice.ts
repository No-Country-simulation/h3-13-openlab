import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URL_DEL_BACKEND,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Iniciativas", "Ordenes"],
  endpoints: (builder) => ({
    // Login de un usuario
    loginUser: builder.mutation({
      query: (data) => ({
        url: "login/signup",
        method: "POST",
        body: data,
      }),
    }),
    // INICIATIVAS
    // Agregar inciativa
    addIniciativa: builder.mutation({
      query: (data) => ({
        url: "iniciativa/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Iniciativas"],
    }),
    // Trae todas las iniciativas
    getIniciativas: builder.query({
      query: (userId) =>
        `iniciativa/getAllIniciativasAndSocials?clienteId=${userId}`,
      providesTags: ["Iniciativas"],
    }),
    // Trae una sola iniciativa por id
    getIniciativaById: builder.query({
      query: (iniciativaId) => `iniciativa/${iniciativaId}`,
      providesTags: ["Iniciativas"],
    }),
    // Trae todas las iniciativas de un usuario
    getIniciativasUser: builder.query({
      query: (userId) => `iniciativa/getUserIniciativas/${userId}`,
    }),
    // ORDERBOOKS
    // Trae todas las ordenes de venta
    getSellOrders: builder.query({
      query: () => "orders/getAllSellOrders",
      providesTags: ["Ordenes"],
    }),
    // Trae todas las ordenes de compra
    getBuyOrders: builder.query({
      query: () => "orders/getAllBuyOrders",
      providesTags: ["Ordenes"],
    }),
    // Agregar Orden de compra
    addBuyOrder: builder.mutation({
      query: (data) => ({
        url: "orders/addBuyOrder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ordenes"],
    }),
    // Borrar Orden de compra
    deleteBuyOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/deleteBuyOrder/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ordenes"],
    }),
    // Agregar Orden de venta
    addSellOrder: builder.mutation({
      query: (data) => ({
        url: "orders/addSellOrder",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ordenes"],
    }),
    // Borrar Orden de compra
    deleteSellOrder: builder.mutation({
      query: (orderId) => ({
        url: `orders/deleteSellOrder/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ordenes"],
    }),
    // ESTADISTICAS y LIKES
    // Trae todas las estadisticas de un usuario
    getStadisticsUser: builder.query({
      query: (userId) => `stadistics/${userId}`,
    }),
    // Maneja los likes
    addLikes: builder.mutation({
      query: (data) => ({
        url: "social/like",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Iniciativas"],
    }),
    // Maneja los shares
    addShares: builder.mutation({
      query: (data) => ({
        url: "social/share",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Iniciativas"],
    }),
    // Maneja los joins
    addJoins: builder.mutation({
      query: (data) => ({
        url: "social/join",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Iniciativas"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetIniciativasQuery,
  useAddIniciativaMutation,
  useGetIniciativaByIdQuery,
  useGetIniciativasUserQuery,
  useGetStadisticsUserQuery,
  useGetBuyOrdersQuery,
  useAddBuyOrderMutation,
  useDeleteBuyOrderMutation,
  useGetSellOrdersQuery,
  useAddSellOrderMutation,
  useDeleteSellOrderMutation,
  useAddLikesMutation,
  useAddJoinsMutation,
  useAddSharesMutation,
} = apiSlice;
