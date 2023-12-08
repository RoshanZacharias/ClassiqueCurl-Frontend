//store
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userReducer from './UserSlice';
import adminReducer from './AdminSlice';
import salonReducer from './SalonSlice';


const persistConfig={
  key:'root',
  storage
}


export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig,userReducer),
    admin: persistReducer(persistConfig,adminReducer),
    salon: persistReducer(persistConfig, salonReducer),
    // Other reducers if necessary
  },
  // Other configurations if needed
});

// export default store;
export const PersistStore = persistStore(store);