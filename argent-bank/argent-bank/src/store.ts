import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { Store } from "redux";
import { rememberMeSlice } from "./reducers/remerberMeSlice";
import { signInSlice } from "./reducers/signInSlice";
import { userInfosSlice } from "./reducers/userInfoSlice";

export const store: Store = configureStore({
  reducer: {
    user: userReducer,
    RememberMe: rememberMeSlice.reducer,
    UserInfos: userInfosSlice.reducer,
    SignIn: signInSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
