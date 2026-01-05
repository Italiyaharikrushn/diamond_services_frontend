import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initialState = {
  token: cookies.get('token') || null,
  isAuthenticated: !!cookies.get('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      cookies.set('token', action.payload, { path: '/' });
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      cookies.remove('token', { path: '/' });
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
