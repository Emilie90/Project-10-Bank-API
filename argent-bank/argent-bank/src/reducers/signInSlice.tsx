import { createSlice } from "@reduxjs/toolkit";

export const signInSlice = createSlice({
  name: "SignIn",
  initialState: {
    signIn: false,
    token: "",
  },
  reducers: {
    isSignIn: (state, action) => {
      state.signIn = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const { isSignIn, setToken } = signInSlice.actions;

export default signInSlice.reducer;
