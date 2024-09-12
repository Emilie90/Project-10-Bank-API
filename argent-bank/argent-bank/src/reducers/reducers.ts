import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
// Async thunk for login
export const login = createAsyncThunk("user/login", async (loginRequest) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      loginRequest
    );

    sessionStorage.setItem("token", response.data.body.token);
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
});

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }

    const response = await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Initial state for userSlice
const initialState = {
  token: null,
  profile: {
    email: null,
    firstName: null,
    lastName: null,
  },
  status: "idle",
  error: null,
};

// User Slice with async actions and reducers
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.profile = { email: null, firstName: null, lastName: null };
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = {
          email: action.payload.body.email,
          firstName: action.payload.body.firstName, // Assurez-vous d'avoir tous les champs nécessaires
          lastName: action.payload.body.lastName,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
// Remember Me Slice
export const rememberMeSlice = createSlice({
  name: "rememberMe",
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

// Sign In Slice
export const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    signIn: false,
    token: "",
    firstName: "", // Ajouter le prénom dans le state pour le composant Nav
  },
  reducers: {
    isSignIn: (state, action) => {
      state.signIn = action.payload.signIn;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName; // Stocker le prénom lors de la connexion
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.signIn = false;
      state.token = "";
      state.firstName = ""; // Réinitialiser le prénom lors de la déconnexion
    },
  },
});

// User Infos Slice
export const userInfosSlice = createSlice({
  name: "userInfos",
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

// Export all actions
export const { setIsChecked } = rememberMeSlice.actions;
export const { isSignIn, setToken, logout } = signInSlice.actions;
export const { setFirstName, setLastName, updateFirstName, updateLastName } =
  userInfosSlice.actions;

// Combine all reducers
export const reducers = {
  rememberMe: rememberMeSlice.reducer,
  signIn: signInSlice.reducer,
  userInfos: userInfosSlice.reducer,
  user: userSlice.reducer,
};

export default reducers;
