import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  salonUser: null,
  salonAccessToken: null,
  isSalonAuthenticated: false,
};

const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {
    setSalonAccessToken(state, action) {
      state.salonAccessToken = action.payload.accessToken;

      Cookies.set('accessToken', action.payload.access);
    },
    setSalonUser(state, action) {
      console.log("ACTION.PAYLOAD 1 = ",action.payload);
      state.salonUser = action.payload;
      state.isSalonAuthenticated = !!action.payload;
      
      console.log("ACTION.PAYLOAD = ",action.payload);
      console.log("state.user = ",state.salon);
    },
    clearSalonAuth(state) {
      state.salonUser = null;
      state.salonAccessToken = null;
      state.isSalonAuthenticated = false;
    },
  },
});

export const { setSalonAccessToken, setSalonUser, clearSalonAuth } = salonSlice.actions;
export default salonSlice.reducer;