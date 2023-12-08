//adminSlice
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  adminUser: null,
  adminAccessToken: null,
  isAdminAuthenticated: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminAccessToken(state, action) {
      state.adminAccessToken = action.payload.accessToken;
      Cookies.set('accessToken', action.payload.access);
    },
    setAdminUser(state, action) {
      state.adminUser = action.payload;
      state.isAdminAuthenticated = !!action.payload;
    },
    clearAdminAuth(state) {
      state.adminUser = null;
      state.adminAccessToken = null;
      state.isAdminAuthenticated = false;
    },
  },
});

export const { setAdminAccessToken, setAdminUser, clearAdminAuth } = adminSlice.actions;
export default adminSlice.reducer;