import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "....",
    credentials: "include",
    // Comprueba si existe un token y lo envia en el header
    /* prepareHeaders: (headers, { getState }) => {
      const token = getState().authToken.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }, */
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Registra un usuario
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "...",
        method: "POST",
        body: userData,
      }),
    }),
    // Login de un usuario
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "....",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    // Logout
    logoutUser: builder.query({
      query: () => "....",
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLazyLogoutUserQuery,
} = apiSlice;
