import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

interface Tag{
  dao:string,
  role:string
}
interface User {
  id: number | null;
  role: string;
  name: string;
  lastName: string;
  email: string;
  tags:Tag[];
}

interface AuthState {
  token: string | null;
  user: User | null;
}

// Estado inicial del usuario
const emptyUser: AuthState = {
  token: null,
  user: {
    id: 1,
    name:"Fabio",
    lastName:"A.",
    email:"FabioA@gmail.com",
    role:"user",
    tags:[{
      dao:"Fractal",
      role:"Co-founder"
    },
    {dao:"EasyMed",
    role:"Colaborator"
    },
    {dao:"Shared",
    role:"Workspace owner"
    }
  ]
  }, 
};

// Slice de autenticación
export const authSlice = createSlice({
  name: "auth",
  initialState: document.cookie
    ? { token: document.cookie.slice(6), user: null } 
    : emptyUser,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null; 
      document.cookie = `token="`; 
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.logoutUser.matchFulfilled,
      (state) => {
        state.token = null;
        state.user = null; 
      }
    );

    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, action: PayloadAction<{ token: string, user: User }>) => {
        const { token, user } = action.payload;
        state.token = token;
        state.user = user; 
        document.cookie = `token=${token}`;
      }
    );
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
