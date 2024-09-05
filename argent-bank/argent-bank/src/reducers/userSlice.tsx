import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Typage pour les paramètres de la requête login
interface LoginRequest {
  email: string;
  password: string;
}

// Typage pour la réponse de l'API login
interface LoginResponse {
  token: string;
}

// Typage pour les paramètres de la mise à jour du profil
interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
}

// Typage pour la réponse de l'API du profil utilisateur
interface UserProfileResponse {
  status: number;
  message: string;
  body: {
    id: string;
    email: string;
  };
}

// Typage pour l'état utilisateur
interface UserState {
  token: string | null;
  profile: {
    id: string | null;
    email: string | null;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// État initial
const initialState: UserState = {
  token: null,
  profile: {
    id: null,
    email: null,
  },
  status: "idle",
  error: null,
};

// Action asynchrone pour le login avec typage explicite
export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "user/login",
  async (loginRequest: LoginRequest) => {
    const response = await axios.post<LoginResponse>(
      "http://localhost:3001/api/v1/user/login",
      loginRequest
    );
    console.log(response);
    return response.data;
  }
);

// Action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk<UserProfileResponse, void>(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const token = state.user.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }

    const response = await axios.post<UserProfileResponse>(
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

// Action asynchrone pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk<
  UserProfileResponse,
  UpdateProfileRequest
>(
  "user/updateProfile",
  async (updateProfileRequest: UpdateProfileRequest, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const token = state.user.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token available");
    }

    const response = await axios.put<UserProfileResponse>(
      "http://localhost:3001/api/v1/user/profile",
      updateProfileRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.profile = { id: null, email: null };
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.status = "succeeded";
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Login failed";
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileResponse>) => {
          state.status = "succeeded";
          state.profile = {
            id: action.payload.body.id,
            email: action.payload.body.email,
          };
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch profile";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<UserProfileResponse>) => {
          state.status = "succeeded";
          state.profile = {
            id: action.payload.body.id,
            email: action.payload.body.email,
          };
        }
      )
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update profile";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
