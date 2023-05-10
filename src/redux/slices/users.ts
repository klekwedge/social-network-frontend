import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IUser, LoadingStatus } from "../../types";


export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id: string) => {
    const { data } = await axios.get(`/user/${id}`);
    return data;
  }
);


interface IState {
  user: IUser | null
  status: LoadingStatus
}


const initialState: IState = {
  user: null,
  status: 'loading'
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user = null;
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.status = "error";
      })
  },
});

export const usersReducer = userSlice.reducer;
