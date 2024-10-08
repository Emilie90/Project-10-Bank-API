import { configureStore, Store } from "@reduxjs/toolkit";
import reducers from "./reducers/reducers";

export const store: Store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
