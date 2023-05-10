import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { RootState } from "../store";
import { IFormLoginValues, IFormRegisterValues, IUser, LoadingStatus } from "../../types";

interface IState {
  data: null | IUser,
  status: LoadingStatus,
  theme: string
}

const initialState: IState = {
  data: null,
  status: "loading",
  theme: localStorage.getItem("theme") || 'light'
};

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params: IFormLoginValues) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params: IFormRegisterValues) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (params) => {
    const { data } = await axios.get("/auth/me");
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload
    },
    changeAvatar: (state, action) => {
      if (state.data) {
        state.data.avatarUrl = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null;
        state.status = "error";
      })
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout, changeTheme, changeAvatar } = authSlice.actions;
