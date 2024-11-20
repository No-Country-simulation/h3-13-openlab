import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// Define el estado inicial del usuario
const emptyUser = {
  token: null,
};

// Utiliza el localStorage para revisar si existe un usuario y mantener la sesión
export const authSlice = createSlice({
  name: "auth",
  initialState: document.cookie
    ? { token: document.cookie.slice(6) }
    : emptyUser,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.logoutUser.matchFulfilled,
      (state) => {
        state.token = null;
      }
    ),
      builder.addMatcher(
        apiSlice.endpoints.loginUser.matchFulfilled,
        (state) => {
          state.token = document.cookie.slice(6);
        }
      );
  },
});
