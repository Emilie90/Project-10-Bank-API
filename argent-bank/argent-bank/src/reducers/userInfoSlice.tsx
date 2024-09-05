import { createSlice } from "@reduxjs/toolkit";

export const userInfosSlice = createSlice({
  name: "UserInfos",
  initialState: {
    firstName: "",
    lastName: "",
    newFirstName: "",
    newLastName: "",
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    updateFirstName: (state, action) => {
      state.newFirstName = action.payload;
    },
    updateLastName: (state, action) => {
      state.newLastName = action.payload;
    },
  },
});
export const { setFirstName, setLastName, updateFirstName, updateLastName } =
  userInfosSlice.actions;

export default userInfosSlice.reducer;
