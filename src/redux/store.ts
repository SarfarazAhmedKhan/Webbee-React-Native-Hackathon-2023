import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import Orientation from './slices/Orientation';
import categorySlice from './slices/categorySlice';

// Define your reducers here
const rootReducer = combineReducers({
  // Reducers go here
  categorySlice,
  Orientation,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create the combined reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// Export the persistor and the store
export const persistor = persistStore(store);
export default store;
