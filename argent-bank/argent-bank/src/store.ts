import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // default: localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import reducers from "./reducers/reducers"; // Import the combined reducer
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["signIn", "rememberMe"], // Only persist certain parts of the state
};

// Apply the persistReducer to reducers
const persistedReducer = persistReducer(persistConfig, reducers);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
