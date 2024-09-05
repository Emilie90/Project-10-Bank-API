import { createSlice } from "@reduxjs/toolkit";

export const rememberMeSlice = createSlice({
  name: "RememberMe",
  initialState: {
    checked: localStorage.getItem("rememberMeIsChecked") === "true" || false,
  },
  reducers: {
    setIsChecked: (state, action) => {
      state.checked = action.payload;
      localStorage.setItem("rememberMeIsChecked", action.payload);
    },
  },
});

export const { setIsChecked } = rememberMeSlice.actions;

export default rememberMeSlice.reducer;
